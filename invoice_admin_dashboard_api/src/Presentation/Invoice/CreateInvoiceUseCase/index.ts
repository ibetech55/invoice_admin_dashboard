import { FileArray } from "express-fileupload";
import { CreateInvoiceDto } from "../../../Data/Invoice/CreateInvoiceDtos";
import { IInvoiceRepository } from "../../../Repository/invoice.repsository/IInvoice.repository";
import { GetPDFData } from "./GetPdfData";
import { CreateInvoiceValuesDto } from "../../../Data/Invoice/ValueInvoicesDto";

export class CreateInvoiceUseCase {
  private readonly _invoiceRepository: IInvoiceRepository;
  private readonly _getPdfData: GetPDFData;

  constructor(invoiceRepository: IInvoiceRepository, getPdfData: GetPDFData) {
    this._invoiceRepository = invoiceRepository;
    this._getPdfData = getPdfData;
  }

  async execute(file: FileArray) {
    const pdfData = await this._getPdfData.execute(file);
    const values: CreateInvoiceDto = {
      instalationNumber: pdfData.instalationNumber,
      referenceMonth: pdfData.referenceData.refernceMonth,
      expirationDate: pdfData.referenceData.expirationDate,
      valueDue: pdfData.referenceData.valueDue,
      invoiceNumber: pdfData.invoiceNumber,
      serie: pdfData.serie,
      emissionDate: pdfData.emissionDate,
      accessKey: pdfData.accessKey,
      authorizationProtocol: pdfData.authorizationProtocol,
      invoiceCreatedAt: pdfData.invoiceCreatedAt,
      class: pdfData.class,
      subClass: pdfData.subclass,
      modulaityTax: pdfData.modualityTax,
      lastReadDate: pdfData.readDates.anterior,
      currentReadDate: pdfData.readDates.current,
      numberDays: pdfData.readDates.days,
      nextReadDate: pdfData.readDates.nextRead,
      measurementType: pdfData.tecInfo.measurementType,
      measurement: pdfData.tecInfo.measurement,
      lastReadValue: pdfData.tecInfo.lastRead,
      currentReadValue: pdfData.tecInfo.currentRead,
      multiplicationConstant: pdfData.tecInfo.multiplicationConstatnt,
      consumptionKwh: pdfData.tecInfo.consumptionKwh,
      qrCode: pdfData.qrCode,
      currentAccountGeneration: pdfData.currentAccountGeneration,
      consumptionHistory: pdfData.consumptionHistory.map((x) => ({
        monthYear: x.monthYear,
        consumptionKwh: x.consumptionKwh,
        measurementKwhPerDay: x.measurementKwhPerDay,
        days: x.days,
        index: x.index,
        invoiceNumber: pdfData.invoiceNumber,
      })),
      client: { ...pdfData.client, clientNumber: pdfData.clientNumber },
      invoiceValues: {
        electricEnergy: pdfData.invoiceValues.electricEnergy,
        energyScee: pdfData.invoiceValues.energiaScee,
        energyCompensated: pdfData.invoiceValues.energiaCompensated,
        contribLlumPublicMunicipalVal: pdfData.invoiceValues.contribLlum,
        accountFine: pdfData.invoiceValues.accountFine,
        accountTax: pdfData.invoiceValues.accountTax,
        accountCorrection: pdfData.invoiceValues.accountCorrection,
        bonusItaipu: pdfData.invoiceValues.bonusItapiu,
      },
    };
    const data = await this._invoiceRepository.create(values);
    return data;
  }
}
