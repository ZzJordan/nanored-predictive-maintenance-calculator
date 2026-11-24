'use client'

import type { Language } from '@/lib/translations'
import type { FieldError } from '@/lib/tools/calculators'

const ERRORS: Record<Language, Record<FieldError, string>> = {
  es: {
    required: 'Rellena este dato.',
    not_number: 'Escribe solo un número (por ejemplo, 12 o 12,5).',
    negative: 'No puede ser negativo.',
    zero: 'Tiene que ser mayor que 0.',
    over_100: 'Un porcentaje va de 0 a 100.',
    over_53: 'Un año tiene como máximo 53 semanas.',
  },
  en: {
    required: 'Fill in this field.',
    not_number: 'Type a number only (for example, 12 or 12.5).',
    negative: 'It cannot be negative.',
    zero: 'It must be greater than 0.',
    over_100: 'A percentage goes from 0 to 100.',
    over_53: 'A year has 53 weeks at most.',
  },
}

/** Campo numérico accesible: texto con teclado decimal (admite coma), unidad visible, ayuda y error asociados. */
export function NumberField({
  id, label, hint, unit, value, onChange, error, showError, onBlur, language, optional,
}: {
  id: string; label: string; hint?: string; unit?: string; value: string; onChange: (v: string) => void
  error?: FieldError; showError: boolean; onBlur: () => void; language: Language; optional?: boolean
}) {
  const visibleError = showError && error ? ERRORS[language][error] : ''
  return (
    <div>
      <label className="lead-label" htmlFor={id}>
        {label}{optional ? <span className="font-normal"> {language === 'es' ? '(opcional)' : '(optional)'}</span> : null}
      </label>
      <div className="tool-number">
        <input
          id={id} className="lead-input" type="text" inputMode="decimal" autoComplete="off" maxLength={14}
          value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur}
          aria-invalid={visibleError ? true : undefined} aria-describedby={`${id}-hint ${id}-error`}
        />
        {unit ? <span className="tool-number-unit" aria-hidden="true">{unit}</span> : null}
      </div>
      <p id={`${id}-hint`} className="tool-hint">{hint}</p>
      <p id={`${id}-error`} className="tool-error" role="alert">{visibleError}</p>
    </div>
  )
}
