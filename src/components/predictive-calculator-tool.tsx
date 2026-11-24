'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { Language } from '@/lib/translations'
import { checkPredictive, formatEuros, formatNumber, type PredictiveFields, type PredictiveInput } from '@/lib/tools/calculators'
import { trackEvent } from '@/lib/analytics'
import { NumberField } from './calc-field'

/**
 * Coste anual de las paradas no planificadas frente al coste de monitorizar, con el punto de equilibrio.
 * Sin porcentajes de reducción: solo cuántas horas o averías tendría que evitar la monitorización para pagarse.
 */
const copy = {
  es: {
    fields: {
      costPerHour: ['Coste de una hora de parada', 'Producción que se pierde + personal parado + urgencias (horas extra, envíos rápidos). Una estimación razonable basta.', '€/h'],
      downtimeHoursPerYear: ['Horas de parada no planificada al año', 'Solo las paradas por averías del equipo o la línea que quieres analizar.', 'h'],
      failuresPerYear: ['Averías al año', 'En cuántos episodios se reparten esas horas.', 'averías'],
      repairCostPerFailure: ['Coste medio de reparación por avería', 'Piezas, mano de obra y servicio técnico externo. Pon 0 si ya va en el coste por hora.', '€'],
      monitoringCostPerYear: ['Coste anual estimado de monitorizar', 'Tu estimación: sensores, conectividad, software y el tiempo de revisar avisos, repartido por año.', '€/año'],
    } satisfies Record<PredictiveFields, [string, string, string]>,
    resultTitle: 'Coste anual de las paradas',
    waiting: 'Rellena los cuatro primeros datos para ver el resultado.',
    downtime: 'Coste de las horas de parada',
    repairs: 'Reparaciones',
    total: 'Total al año',
    perFailure: (c: string, h: string) => `Cada avería cuesta de media ${c} (${h} h de parada más su reparación).`,
    beTitle: 'Punto de equilibrio de la monitorización',
    beHours: (h: string) => `La monitorización se paga si evita ${h} horas de parada al año`,
    beShare: (p: string) => `Equivale al ${p} % de tus horas de parada actuales.`,
    beFailures: (f: string) => `Contando también la reparación, le basta con evitar ${f} averías al año.`,
    beExceeds: 'Con estos datos, monitorizar cuesta más que todas tus paradas y reparaciones actuales: por ahorro directo no se pagaría. Puede tener sentido por seguridad, calidad o planificación, pero eso hay que valorarlo aparte.',
    beNote: 'Es una cuenta de equilibrio, no una previsión: cuántas horas evitará depende de tus datos, de tus modos de fallo y de que alguien pueda actuar con el aviso.',
    noMonitoring: 'Pon tu estimación del coste anual de monitorizar para ver cuántas horas de parada tendría que evitar para pagarse.',
    privacy: 'Los datos que escribes no salen de tu navegador.',
  },
  en: {
    fields: {
      costPerHour: ['Cost of one hour of downtime', 'Lost production + idle staff + emergency costs (overtime, express shipping). A reasonable estimate is enough.', '€/h'],
      downtimeHoursPerYear: ['Unplanned downtime hours per year', 'Only stoppages caused by failures of the equipment or line you want to analyse.', 'h'],
      failuresPerYear: ['Failures per year', 'How many episodes those hours are spread over.', 'failures'],
      repairCostPerFailure: ['Average repair cost per failure', 'Parts, labour and external service. Enter 0 if it is already in the hourly cost.', '€'],
      monitoringCostPerYear: ['Estimated annual cost of monitoring', 'Your estimate: sensors, connectivity, software and the time spent reviewing alerts, spread per year.', '€/yr'],
    } satisfies Record<PredictiveFields, [string, string, string]>,
    resultTitle: 'Annual cost of downtime',
    waiting: 'Fill in the first four fields to see the result.',
    downtime: 'Cost of downtime hours',
    repairs: 'Repairs',
    total: 'Total per year',
    perFailure: (c: string, h: string) => `Each failure costs ${c} on average (${h} h of downtime plus its repair).`,
    beTitle: 'Monitoring break-even point',
    beHours: (h: string) => `Monitoring pays for itself if it avoids ${h} hours of downtime a year`,
    beShare: (p: string) => `That is ${p}% of your current downtime hours.`,
    beFailures: (f: string) => `Counting repairs as well, it only needs to avoid ${f} failures a year.`,
    beExceeds: 'With these figures, monitoring costs more than all your current downtime and repairs: it would not pay for itself through direct savings. It may still make sense for safety, quality or planning, but that needs to be assessed separately.',
    beNote: 'This is a break-even calculation, not a forecast: how many hours it avoids depends on your data, your failure modes and someone being able to act on the alert.',
    noMonitoring: 'Enter your estimate of the annual cost of monitoring to see how many downtime hours it would need to avoid to pay for itself.',
    privacy: 'The figures you type never leave your browser.',
  },
} as const

const EMPTY: PredictiveInput = { costPerHour: '', downtimeHoursPerYear: '', failuresPerYear: '', repairCostPerFailure: '', monitoringCostPerYear: '' }
const FIELDS: PredictiveFields[] = ['costPerHour', 'downtimeHoursPerYear', 'failuresPerYear', 'repairCostPerFailure', 'monitoringCostPerYear']

export function PredictiveCalculatorTool({ language }: { language: Language }) {
  const t = copy[language]
  const id = useId()
  const [values, setValues] = useState<PredictiveInput>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<PredictiveFields, boolean>>>({})
  const { errors, result } = useMemo(() => checkPredictive(values), [values])
  const tracked = useRef(false)
  useEffect(() => {
    if (result && !tracked.current) { tracked.current = true; trackEvent('tool_action', { tool: 'mantenimiento_predictivo', action: 'calculate' }) }
  }, [result])

  const eur = (n: number) => formatEuros(n, language)
  const num = (n: number, d = 1) => formatNumber(n, language, d)
  const be = result?.breakEven

  return (
    <div className="tool-panel">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map((k) => (
            <NumberField
              key={k} id={`${id}-${k}`} label={t.fields[k][0]} hint={t.fields[k][1]} unit={t.fields[k][2]} language={language}
              value={values[k]} onChange={(v) => setValues((p) => ({ ...p, [k]: v }))} onBlur={() => setTouched((p) => ({ ...p, [k]: true }))}
              error={errors[k]} showError={Boolean(touched[k] || values[k].trim())} optional={k === 'monitoringCostPerYear'}
            />
          ))}
        </div>
        <p className="tool-hint">{t.privacy}</p>
      </form>

      <section className="tool-result" aria-labelledby={`${id}-result`} aria-live="polite">
        <h3 id={`${id}-result`} className="tool-subtitle">{t.resultTitle}</h3>
        {!result ? <p className="tool-hint">{t.waiting}</p> : (
          <>
            <dl className="tool-figures">
              <div><dt>{t.total}</dt><dd><strong>{eur(result.totalPerYear)}</strong></dd></div>
              <div><dt>{t.downtime}</dt><dd>{eur(result.downtimeCostPerYear)}</dd></div>
              <div><dt>{t.repairs}</dt><dd>{eur(result.repairCostPerYear)}</dd></div>
            </dl>
            <p className="tool-hint">{t.perFailure(eur(result.costPerFailure), num(result.hoursPerFailure))}</p>
            <div className="mt-6">
              <h4 className="tool-subtitle">{t.beTitle}</h4>
              {!be ? <p className="tool-hint">{t.noMonitoring}</p> : be.exceedsCurrentCost ? <p className="tool-warning">{t.beExceeds}</p> : (
                <>
                  <p className="tool-headline">{t.beHours(num(be.hours))}.</p>
                  <p className="text-base leading-relaxed mt-2">{t.beShare(num(be.shareOfDowntime * 100, 0))} {t.beFailures(num(be.failures))}</p>
                </>
              )}
              {be ? <p className="tool-hint mt-3">{t.beNote}</p> : null}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
