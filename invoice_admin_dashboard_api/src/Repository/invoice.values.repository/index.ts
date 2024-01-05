import { PrismaClient } from "@prisma/client";
import { IInvoiceValuesRepository } from "./IInvoiceValues.repository";
import { IGetEnergyTotalValues } from "../../Data/InvoiceValues/GetEnergyTotalValuesDto";

export class InvoiceValuesRepository implements IInvoiceValuesRepository {
  private prisma = new PrismaClient();
  constructor() {}

  async getTotalEnergyValues(): Promise<IGetEnergyTotalValues> {
    try {
      const data = await this.prisma.$queryRaw`
    Select 
      sum(ee.value) as electric_energy_total_value, avg(ee.value) as electric_energy_avg_value, 
      sum(es.value) as energy_scee_total_value, avg(es.value) as energy_scee_avg_value, 
      sum(ec.value) as energy_compensated_total_value, avg(ec.value) as energy_compensated_avg_value, 
      sum(iv.contrib_llum_public_municipal_val) as contrib_llum_total_value, avg(iv.contrib_llum_public_municipal_val) as contrib_llum_avg_value,
      sum(iv.bonus_itaipu_val) as bonus_itaipu_total_value, avg(iv.bonus_itaipu_val) as bonus_itaipu_avg_value,
      sum(af.account_value) as account_fine_total_value, avg(af.account_value) as account_fine_avg_value, 
      sum(at.account_value) as account_tax_total_value, avg(at.account_value) as account_tax_avg_value, 
      sum(ac.account_value) as account_correction_total_value, avg(ac.account_value) as account_correction_avg_value
      from invoice_values iv
      inner join electric_energy ee on ee.id = iv.electric_energy_id
      inner join energy_scee es on es.id = iv.energy_scee_id
      inner join energy_compensated ec on ec.id = iv.energy_compensated_id
      left join account_fine af on af.id = iv.account_fine_id
      left join account_tax at on at.id = iv.account_tax_id
      left join account_correction ac on ac.id = iv.account_correction_id
      `;
      return data[0];
    } catch (error) {
      console.log(error);
    }
  }
}
