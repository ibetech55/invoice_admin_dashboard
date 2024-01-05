export interface ISceeIcmsEnergy {
  id: string;
  unit: number;
  quantity: number;
  unit_price: number;
  pis_cofins: number;
  base_calc_icms: number;
  aliq_icms: number;
  icms: number;
  unit_tax: number;
}

export interface SceeIcmsEnergyDto {
  id: string;
  unit: number;
  quantity: number;
  unitPrice: number;
  pisCofins: number;
  baseCalcIcms: number;
  aliqIcms: number;
  icms: number;
  unitTax: number;
}

export interface CreateSceeIcmsEnergyDto {
  unit: number;
  quantity: number;
  unitPrice: number;
  pisCofins: number;
  baseCalcIcms: number;
  aliqIcms: number;
  icms: number;
  unitTax: number;
}
