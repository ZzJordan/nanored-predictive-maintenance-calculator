import { describe, expect, it } from 'vitest'
import { checkPredictive, predictiveCost } from '@/lib/tools/calculators'

describe('calculadora de mantenimiento predictivo', () => {
  it('suma paradas y reparaciones', () => {
    const r = predictiveCost({ costPerHour: 1000, downtimeHoursPerYear: 20, failuresPerYear: 4, repairCostPerFailure: 500, monitoringCostPerYear: null })
    expect(r.downtimeCostPerYear).toBe(20000)
    expect(r.repairCostPerYear).toBe(2000)
    expect(r.totalPerYear).toBe(22000)
  })
  it('valida los datos', () => {
    const { result, errors } = checkPredictive({ costPerHour: '', downtimeHoursPerYear: '-1', failuresPerYear: '0', repairCostPerFailure: 'x', monitoringCostPerYear: '' })
    expect(result).toBeNull()
    expect(Object.keys(errors).length).toBeGreaterThan(0)
  })
})
