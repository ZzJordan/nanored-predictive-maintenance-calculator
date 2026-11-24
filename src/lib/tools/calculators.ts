/**
 * Cálculos de las calculadoras gratuitas (citas perdidas y mantenimiento predictivo). Lógica pura y probada
 * (tests/tools-fase2.test.mjs): todas las cifras las pone el usuario; aquí no hay tasas de referencia,
 * porcentajes de reducción ni datos de estudios.
 */

/** Convierte lo que escribe el usuario («1.234,5», «12,5», «60 €», «8 %») en número; null si no es un número. */
export function parseNumber(raw: string): number | null {
  let s = raw.trim().replace(/[€%\s ]/g, '')
  if (!s) return null
  if (!/^-?[\d.,]+$/.test(s)) return null
  const lastComma = s.lastIndexOf(',')
  const lastDot = s.lastIndexOf('.')
  if (lastComma > -1 && lastDot > -1) {
    // El último separador es el decimal; el otro, de miles.
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '')
  } else if (lastComma > -1) {
    // «12,5» = decimal; «1,500» (tres cifras detrás) o «1,500,000» = separador de miles.
    const parts = s.split(',')
    s = parts.length > 2 || parts[1].length === 3 ? s.replace(/,/g, '') : s.replace(',', '.')
  } else if (lastDot > -1) {
    const parts = s.split('.')
    // «1.500» (un punto y tres cifras) o «1.500.000» = miles; «12.5» = decimal.
    if (parts.length > 2 || parts[1].length === 3) s = s.replace(/\./g, '')
  }
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

export type FieldError = 'required' | 'not_number' | 'negative' | 'zero' | 'over_100' | 'over_53'
export type FieldCheck = { value: number | null; error: FieldError | null }

/** Valida un campo: vacío (si es opcional) → value null sin error. */
export function checkField(raw: string, opts: { optional?: boolean; positive?: boolean; percent?: boolean; weeks?: boolean } = {}): FieldCheck {
  if (!raw.trim()) return { value: null, error: opts.optional ? null : 'required' }
  const n = parseNumber(raw)
  if (n === null) return { value: null, error: 'not_number' }
  if (n < 0) return { value: null, error: 'negative' }
  if (opts.positive && n === 0) return { value: null, error: 'zero' }
  if (opts.percent && n > 100) return { value: null, error: 'over_100' }
  if (opts.weeks && n > 53) return { value: null, error: 'over_53' }
  return { value: n, error: null }
}

// ── Citas perdidas (no-shows) ─────────────────────────────────────────────

export interface NoShowInput {
  appointmentsPerWeek: string
  noShowRate: string
  revenuePerAppointment: string
  weeksPerYear: string
  /** Opcional: porcentaje de ausencias que el usuario cree que podría recuperar. Sin valor por defecto. */
  recoveryRate: string
}

export interface NoShowResult {
  missedPerYear: number
  missedPerMonth: number
  lostPerYear: number
  lostPerMonth: number
  /** Solo si el usuario ha puesto su porcentaje de recuperación. */
  recovery: null | { rate: number; appointmentsPerYear: number; appointmentsPerMonth: number; perYear: number; perMonth: number }
}

export type NoShowFields = keyof NoShowInput

export function checkNoShow(input: NoShowInput): { errors: Partial<Record<NoShowFields, FieldError>>; result: NoShowResult | null } {
  const checks: Record<NoShowFields, FieldCheck> = {
    appointmentsPerWeek: checkField(input.appointmentsPerWeek, { positive: true }),
    noShowRate: checkField(input.noShowRate, { percent: true }),
    revenuePerAppointment: checkField(input.revenuePerAppointment),
    weeksPerYear: checkField(input.weeksPerYear, { positive: true, weeks: true }),
    recoveryRate: checkField(input.recoveryRate, { optional: true, percent: true }),
  }
  const errors: Partial<Record<NoShowFields, FieldError>> = {}
  for (const [k, c] of Object.entries(checks) as [NoShowFields, FieldCheck][]) if (c.error) errors[k] = c.error
  if (Object.keys(errors).length) return { errors, result: null }
  return {
    errors,
    result: noShowCost({
      appointmentsPerWeek: checks.appointmentsPerWeek.value as number,
      noShowRate: checks.noShowRate.value as number,
      revenuePerAppointment: checks.revenuePerAppointment.value as number,
      weeksPerYear: checks.weeksPerYear.value as number,
      recoveryRate: checks.recoveryRate.value,
    }),
  }
}

export function noShowCost(v: { appointmentsPerWeek: number; noShowRate: number; revenuePerAppointment: number; weeksPerYear: number; recoveryRate: number | null }): NoShowResult {
  const missedPerYear = v.appointmentsPerWeek * (v.noShowRate / 100) * v.weeksPerYear
  const lostPerYear = missedPerYear * v.revenuePerAppointment
  const r = v.recoveryRate
  return {
    missedPerYear,
    missedPerMonth: missedPerYear / 12,
    lostPerYear,
    lostPerMonth: lostPerYear / 12,
    recovery: r === null ? null : {
      rate: r,
      appointmentsPerYear: missedPerYear * (r / 100),
      appointmentsPerMonth: (missedPerYear * (r / 100)) / 12,
      perYear: lostPerYear * (r / 100),
      perMonth: (lostPerYear * (r / 100)) / 12,
    },
  }
}

/**
 * Valores de EJEMPLO por sector: solo rellenan el formulario para enseñar cómo funciona. No son datos reales,
 * ni medias del sector, ni salen de ningún estudio; la página lo dice junto al selector. Sin recuperación.
 */
export const NO_SHOW_EXAMPLES = {
  dental: { appointmentsPerWeek: '60', noShowRate: '8', revenuePerAppointment: '60', weeksPerYear: '46' },
  fisio: { appointmentsPerWeek: '50', noShowRate: '8', revenuePerAppointment: '40', weeksPerYear: '46' },
  veterinaria: { appointmentsPerWeek: '45', noShowRate: '6', revenuePerAppointment: '45', weeksPerYear: '48' },
  peluqueria: { appointmentsPerWeek: '70', noShowRate: '7', revenuePerAppointment: '25', weeksPerYear: '48' },
} as const satisfies Record<string, Omit<NoShowInput, 'recoveryRate'>>
export type NoShowExample = keyof typeof NO_SHOW_EXAMPLES

// ── Mantenimiento predictivo: coste de las paradas frente a monitorizar ───

export interface PredictiveInput {
  /** Coste de una hora de parada: producción perdida + personal parado + urgencias. */
  costPerHour: string
  /** Horas de parada no planificada al año por averías. */
  downtimeHoursPerYear: string
  /** Número de averías al año (para repartir las horas y sumar la reparación de cada una). */
  failuresPerYear: string
  /** Coste medio de reparación de cada avería (piezas, mano de obra, servicio externo). */
  repairCostPerFailure: string
  /** Opcional: coste anual estimado de monitorizar (sensores, conectividad, software, revisión). Lo pone el usuario. */
  monitoringCostPerYear: string
}
export type PredictiveFields = keyof PredictiveInput

export interface PredictiveResult {
  downtimeCostPerYear: number
  repairCostPerYear: number
  totalPerYear: number
  /** Coste medio de una avería: sus horas de parada + su reparación. */
  costPerFailure: number
  hoursPerFailure: number
  breakEven: null | {
    monitoringCostPerYear: number
    /** Horas de parada al año que habría que evitar para pagar la monitorización (sin contar reparaciones). */
    hours: number
    /** Esas horas sobre las horas de parada actuales (0-1+). */
    shareOfDowntime: number
    /** Averías completas (parada + reparación) que habría que evitar al año. */
    failures: number
    /** true si la monitorización cuesta más que todas las paradas y reparaciones actuales. */
    exceedsCurrentCost: boolean
  }
}

export function checkPredictive(input: PredictiveInput): { errors: Partial<Record<PredictiveFields, FieldError>>; result: PredictiveResult | null } {
  const checks: Record<PredictiveFields, FieldCheck> = {
    costPerHour: checkField(input.costPerHour, { positive: true }),
    downtimeHoursPerYear: checkField(input.downtimeHoursPerYear, { positive: true }),
    failuresPerYear: checkField(input.failuresPerYear, { positive: true }),
    repairCostPerFailure: checkField(input.repairCostPerFailure),
    monitoringCostPerYear: checkField(input.monitoringCostPerYear, { optional: true, positive: true }),
  }
  const errors: Partial<Record<PredictiveFields, FieldError>> = {}
  for (const [k, c] of Object.entries(checks) as [PredictiveFields, FieldCheck][]) if (c.error) errors[k] = c.error
  if (Object.keys(errors).length) return { errors, result: null }
  return {
    errors,
    result: predictiveCost({
      costPerHour: checks.costPerHour.value as number,
      downtimeHoursPerYear: checks.downtimeHoursPerYear.value as number,
      failuresPerYear: checks.failuresPerYear.value as number,
      repairCostPerFailure: checks.repairCostPerFailure.value as number,
      monitoringCostPerYear: checks.monitoringCostPerYear.value,
    }),
  }
}

export function predictiveCost(v: { costPerHour: number; downtimeHoursPerYear: number; failuresPerYear: number; repairCostPerFailure: number; monitoringCostPerYear: number | null }): PredictiveResult {
  const downtimeCostPerYear = v.costPerHour * v.downtimeHoursPerYear
  const repairCostPerYear = v.repairCostPerFailure * v.failuresPerYear
  const totalPerYear = downtimeCostPerYear + repairCostPerYear
  const hoursPerFailure = v.downtimeHoursPerYear / v.failuresPerYear
  const costPerFailure = totalPerYear / v.failuresPerYear
  const m = v.monitoringCostPerYear
  return {
    downtimeCostPerYear,
    repairCostPerYear,
    totalPerYear,
    costPerFailure,
    hoursPerFailure,
    breakEven: m === null ? null : {
      monitoringCostPerYear: m,
      hours: m / v.costPerHour,
      shareOfDowntime: m / v.costPerHour / v.downtimeHoursPerYear,
      failures: m / costPerFailure,
      exceedsCurrentCost: m > totalPerYear,
    },
  }
}

// ── Formato ───────────────────────────────────────────────────────────────

const locale = (lang: 'es' | 'en') => (lang === 'es' ? 'es-ES' : 'en-GB')

export function formatEuros(n: number, lang: 'es' | 'en', digits = 0): string {
  return new Intl.NumberFormat(locale(lang), { style: 'currency', currency: 'EUR', maximumFractionDigits: digits, minimumFractionDigits: 0, useGrouping: 'always' }).format(digits ? n : Math.round(n))
}

/** Número con hasta `digits` decimales (sin ceros sobrantes). */
export function formatNumber(n: number, lang: 'es' | 'en', digits = 1): string {
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: digits, useGrouping: 'always' }).format(n)
}
