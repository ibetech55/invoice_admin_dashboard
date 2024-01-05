import { PrismaClient } from "@prisma/client";
import { IInvoiceRepository } from "./IInvoice.repository";
import { CreateInvoiceDto } from "../../Data/Invoice/CreateInvoiceDtos";
import { IGetInvoices } from "../../Data/Invoice/GetInvoicesDto";
import { IGetInvoice } from "../../Data/Invoice/GetInvoice";
import { IGetInvoiceTotalValues } from "../../Data/Invoice/GetTotalValueDueDto";
import { IGetTotalValueDueReferenceMonth } from "../../Data/Invoice/GetTotalValueDueReferenceMonth";
import { InvoiceQueryDto } from "../../Data/Invoice/InvoiceQueryDto";

export class InvoiceRepository implements IInvoiceRepository {
  private prisma = new PrismaClient();

  async getTotalValueDueRefernceMonth(
    query: InvoiceQueryDto
  ): Promise<IGetTotalValueDueReferenceMonth[]> {
    try {
      console.log(query);
      const data = await this.prisma.invoices.groupBy({
        _sum: { value_due: true },
        orderBy: { reference_month: "asc" },
        by: ["reference_month"],
        where: this.handleQuery(query).where,
      });

      const formatData: IGetTotalValueDueReferenceMonth[] = data.map((x) => ({
        reference_month: x.reference_month,
        total_value_due_reference_month: x._sum.value_due,
      }));
      return formatData;
    } catch (error) {
      console.log(error);
    }
  }

  async getInvoiceTotalValues(
    query: InvoiceQueryDto
  ): Promise<IGetInvoiceTotalValues> {
    try {
      const data = await this.prisma.invoices.aggregate({
        _sum: { value_due: true, consumption_kwh: true },
        _avg: { value_due: true, consumption_kwh: true },
        ...this.handleQuery(query),
      });
      const totalValues = {
        total_value_due: data._sum.value_due,
        avg_value_due: data._avg.value_due,
        total_consumption_kwh: data._sum.consumption_kwh,
        avg_consumption_kwh: data._avg.consumption_kwh,
      };
      return totalValues;
    } catch (error) {
      console.log(error);
    }
  }
  private handleQuery(query: InvoiceQueryDto) {
    let where = {};
    if (query.invoiceNumber) {
      where = {
        ...where,
        invoice_number: { contains: query.invoiceNumber },
      };
    }
    if (query.referenceMonth) {
      where = {
        ...where,
        reference_month: new Date(query.referenceMonth),
      };
    }
    if (query.minValueDue && query.maxValueDue) {
      where = {
        ...where,
        values_due: { gte: query.minValueDue, lt: query.maxValueDue },
      };
    }
    if (query.maxConsumptionKwh && query.minConsumptionKwh) {
      where = {
        ...where,
        consumption_kwh: {
          gte: query.minConsumptionKwh,
          lt: query.maxConsumptionKwh,
        },
      };
    }

    if (query.expirationDateEnd && query.expirationDateStart) {
      where = {
        ...where,
        expiration_date: {
          gte: new Date(query.expirationDateStart),
          lt: new Date(query.expirationDateEnd),
        },
      };
    }

    return {
      where,
      skip: (query.page - 1) * Number(query.limit) || 0,
      take: Number(query.limit) || 10,
    };
  }
  async find(query: InvoiceQueryDto): Promise<IGetInvoices> {
    try {
      const { where, skip, take } = this.handleQuery(query);
      const data = await this.prisma.invoices.findMany({
        select: {
          id: true,
          instalation_number: true,
          reference_month: true,
          expiration_date: true,
          value_due: true,
          invoice_number: true,
          emission_date: true,
          last_read_date: true,
          current_read_date: true,
          last_read_value: true,
          current_read_value: true,
          consumption_kwh: true,
          client: {
            select: {
              id: true,
              name: true,
              street_address: true,
              zip_code: true,
              city: true,
              state: true,
              type: true,
            },
          },
          created_at: true,
        },
        where,
        skip,
        take,
      });
      const total = await this.prisma.invoices.count({
        where,
      });
      return { data, total };
    } catch (error) {
      console.log(error);
    }
  }
  async create(values: CreateInvoiceDto) {
    try {
      const data = await this.prisma.invoices.create({
        data: {
          instalation_number: values.instalationNumber,
          reference_month: new Date(values.referenceMonth),
          expiration_date: new Date(values.expirationDate),
          value_due: values.valueDue,
          invoice_number: values.invoiceNumber,
          serie: values.serie,
          emission_date: new Date(values.emissionDate),
          access_key: values.accessKey,
          authorization_protocol: values.authorizationProtocol,
          invoice_created_at: values.invoiceCreatedAt,
          class: values.class,
          subclass: values.subClass,
          moduality_tax: values.modulaityTax,
          last_read_date: new Date(values.lastReadDate),
          current_read_date: new Date(values.currentReadDate),
          number_days: values.numberDays,
          next_read_date: new Date(values.nextReadDate),
          measurement_type: values.measurementType,
          measurement: values.measurement,
          last_read_value: values.lastReadValue,
          current_read_value: values.currentReadValue,
          multiplication_constant: values.multiplicationConstant,
          consumption_kwh: values.consumptionKwh,
          qr_code: values.qrCode,
          current_account_generation: values.currentAccountGeneration,
          client: {
            create: {
              name: values.client.name,
              client_number: values.client.clientNumber,
              street_address: values.client.streetAddress,
              zip_code: values.client.name,
              tax_identifier: values.client.taxIdentifier,
              state_inscription: values.client.stateInscription,
              city: values.client.city,
              state: values.client.state,
              type: values.client.type,
            },
          },
          consumption_history: {
            create: values.consumptionHistory.map((x) => ({
              month_year: x.monthYear,
              consumption_kwh: x.consumptionKwh,
              measurement_kwh_per_day: x.measurementKwhPerDay,
              days: x.days,
              index: x.index,
              invoice_number: x.invoiceNumber,
            })),
          },
          invoice_values: {
            create: {
              electric_energy: {
                create: {
                  quantity: values.invoiceValues.electricEnergy.quantity,
                  unit_price: values.invoiceValues.electricEnergy.unitPrice,
                  unit_tax: values.invoiceValues.electricEnergy.unitTax,
                  value: values.invoiceValues.electricEnergy.value,
                },
              },
              energy_scee: {
                create: {
                  quantity: values.invoiceValues.energyScee.quantity,
                  unit_price: values.invoiceValues.energyScee.unitPrice,
                  unit_tax: values.invoiceValues.energyScee.unitTax,
                  value: values.invoiceValues.energyScee.value,
                },
              },
              energy_compensated: {
                create: {
                  quantity: values.invoiceValues.energyCompensated.quantity,
                  unit_price: values.invoiceValues.energyCompensated.unitPrice,
                  unit_tax: values.invoiceValues.energyCompensated.unitTax,
                  value: values.invoiceValues.energyCompensated.value,
                },
              },
              bonus_itaipu_val: values.invoiceValues.bonusItaipu
                ? values.invoiceValues.bonusItaipu
                : null,
              contrib_llum_public_municipal_val:
                values.invoiceValues.contribLlumPublicMunicipalVal,
              account_fine: values.invoiceValues.accountFine
                ? {
                    create: {
                      account_month: new Date(
                        values.invoiceValues.accountFine.accountMonth
                      ),
                      account_value:
                        values.invoiceValues.accountFine.accountValue,
                    },
                  }
                : {},
              account_tax: values.invoiceValues.accountTax
                ? {
                    create: {
                      account_month: new Date(
                        values.invoiceValues.accountTax.accountMonth
                      ),
                      account_value:
                        values.invoiceValues.accountTax.accountValue,
                      account_date_paid: new Date(
                        values.invoiceValues.accountTax.accountDatePaid
                      ),
                    },
                  }
                : {},
              account_correction: values.invoiceValues.accountCorrection
                ? {
                    create: {
                      account_month: new Date(
                        values.invoiceValues.accountCorrection.accountMonth
                      ),
                      account_value:
                        values.invoiceValues.accountCorrection.accountValue,
                      account_date_paid: new Date(
                        values.invoiceValues.accountCorrection.accountDatePaid
                      ),
                    },
                  }
                : {},
            },
          },
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async createMany(values: CreateInvoiceDto[]) {
    try {
      const data = await this.prisma.invoices.createMany({
        data: values.map((x: CreateInvoiceDto) => ({
          instalation_number: x.instalationNumber,
          reference_month: new Date(x.referenceMonth),
          expiration_date: new Date(x.expirationDate),
          value_due: x.valueDue,
          invoice_number: x.invoiceNumber,
          serie: x.serie,
          emission_date: new Date(x.emissionDate),
          access_key: x.accessKey,
          authorization_protocol: x.authorizationProtocol,
          invoice_created_at: x.invoiceCreatedAt,
          class: x.class,
          subclass: x.subClass,
          moduality_tax: x.modulaityTax,
          last_read_date: new Date(x.lastReadDate),
          current_read_date: new Date(x.currentReadDate),
          number_days: x.numberDays,
          next_read_date: new Date(x.nextReadDate),
          measurement_type: x.measurementType,
          measurement: x.measurement,
          last_read_value: x.lastReadValue,
          current_read_value: x.currentReadValue,
          multiplication_constant: x.multiplicationConstant,
          consumption_kwh: x.consumptionKwh,
          qr_code: x.qrCode,
          current_account_generation: x.currentAccountGeneration,
          client: {
            create: {
              name: x.client.name,
              client_number: x.client.clientNumber,
              street_address: x.client.streetAddress,
              zip_code: x.client.name,
              tax_identifier: x.client.taxIdentifier,
              state_inscription: x.client.stateInscription,
              city: x.client.city,
              state: x.client.state,
              type: x.client.type,
            },
          },
          consumption_history: {
            create: x.consumptionHistory.map((ch) => ({
              month_year: ch.monthYear,
              consumption_kwh: ch.consumptionKwh,
              measurement_kwh_per_day: ch.measurementKwhPerDay,
              days: ch.days,
              index: ch.index,
              invoice_number: ch.invoiceNumber,
            })),
          },
          invoice_values: {
            create: {
              electric_energy: {
                create: {
                  quantity: x.invoiceValues.electricEnergy.quantity,
                  unit_price: x.invoiceValues.electricEnergy.unitPrice,
                  unit_tax: x.invoiceValues.electricEnergy.unitTax,
                  value: x.invoiceValues.electricEnergy.value,
                },
              },
              energy_scee: {
                create: {
                  quantity: x.invoiceValues.energyScee.quantity,
                  unit_price: x.invoiceValues.energyScee.unitPrice,
                  unit_tax: x.invoiceValues.energyScee.unitTax,
                  value: x.invoiceValues.energyScee.value,
                },
              },
              energy_compensated: {
                create: {
                  quantity: x.invoiceValues.energyCompensated.quantity,
                  unit_price: x.invoiceValues.energyCompensated.unitPrice,
                  unit_tax: x.invoiceValues.energyCompensated.unitTax,
                  value: x.invoiceValues.energyCompensated.value,
                },
              },
              bonus_itaipu_val: x.invoiceValues.bonusItaipu
                ? x.invoiceValues.bonusItaipu
                : null,
              contrib_llum_public_municipal_val:
                x.invoiceValues.contribLlumPublicMunicipalVal,
              account_fine: x.invoiceValues.accountFine
                ? {
                    create: {
                      account_month: new Date(
                        x.invoiceValues.accountFine.accountMonth
                      ),
                      account_value:
                        x.invoiceValues.accountFine.accountValue,
                    },
                  }
                : {},
              account_tax: x.invoiceValues.accountTax
                ? {
                    create: {
                      account_month: new Date(
                        x.invoiceValues.accountTax.accountMonth
                      ),
                      account_value:
                        x.invoiceValues.accountTax.accountValue,
                      account_date_paid: new Date(
                        x.invoiceValues.accountTax.accountDatePaid
                      ),
                    },
                  }
                : {},
              account_correction: x.invoiceValues.accountCorrection
                ? {
                    create: {
                      account_month: new Date(
                        x.invoiceValues.accountCorrection.accountMonth
                      ),
                      account_value:
                        x.invoiceValues.accountCorrection.accountValue,
                      account_date_paid: new Date(
                        x.invoiceValues.accountCorrection.accountDatePaid
                      ),
                    },
                  }
                : {},
            },
          },
        })),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<IGetInvoice> {
    try {
      const data = await this.prisma.invoices.findFirst({
        where: { id },
        select: {
          id: true,
          instalation_number: true,
          reference_month: true,
          expiration_date: true,
          value_due: true,
          invoice_number: true,
          serie: true,
          emission_date: true,
          access_key: true,
          authorization_protocol: true,
          invoice_created_at: true,
          class: true,
          subclass: true,
          moduality_tax: true,
          last_read_date: true,
          current_read_date: true,
          number_days: true,
          next_read_date: true,
          measurement_type: true,
          measurement: true,
          last_read_value: true,
          current_read_value: true,
          multiplication_constant: true,
          consumption_kwh: true,
          qr_code: true,
          current_account_generation: true,
          created_at: true,
          client: {
            select: {
              id: true,
              name: true,
              street_address: true,
              zip_code: true,
              city: true,
              tax_identifier: true,
              state: true,
              type: true,
              state_inscription: true,
            },
          },
          consumption_history: {
            orderBy: { index: "asc" },
            select: {
              id: true,
              month_year: true,
              consumption_kwh: true,
              measurement_kwh_per_day: true,
              days: true,
              index: true,
            },
          },
          invoice_values: {
            select: {
              id: true,
              contrib_llum_public_municipal_val: true,
              bonus_itaipu_val: true,
              electric_energy: {
                select: {
                  id: true,
                  quantity: true,
                  unit_price: true,
                  value: true,
                  unit_tax: true,
                },
              },
              energy_scee: {
                select: {
                  id: true,
                  quantity: true,
                  unit_price: true,
                  value: true,
                  unit_tax: true,
                },
              },
              energy_compensated: {
                select: {
                  id: true,
                  quantity: true,
                  unit_price: true,
                  value: true,
                  unit_tax: true,
                },
              },
              account_fine: {
                select: {
                  id: true,
                  account_month: true,
                  account_value: true,
                },
              },
              account_tax: {
                select: {
                  id: true,
                  account_month: true,
                  account_value: true,
                  account_date_paid: true,
                },
              },
              account_correction: {
                select: {
                  id: true,
                  account_month: true,
                  account_value: true,
                  account_date_paid: true,
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
