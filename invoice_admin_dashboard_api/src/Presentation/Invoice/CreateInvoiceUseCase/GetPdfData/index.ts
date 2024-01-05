import { FileArray, UploadedFile } from "express-fileupload";
import pdfParse from "pdf-parse";
import { parseNumber } from "../../../../Utils/ParseNumber";
import { parseToIsoDate } from "../../../../Utils/ParseToIsoDate";
import { parseMonthYr } from "../../../../Utils/ParseMonthYr";
import {
  IInvoiceData,
  ICreateClientData,
  IReferenceData,
  IReadDates,
  IInvoiceValuesData,
  IEnergyData,
  IAccountFineData,
  IAccountTaxData,
  IAccountCorrectionData,
  ITechInfoData,
} from "../../../../Data/Invoice/CreateInvoiceDtos/GetPdfData";
import { CreateConsumptionHistoryExtractDto } from "../../../../Data/Invoice/ConsumptionHistoryDto";

export class GetPDFData {
  constructor() {}

  async execute(file: FileArray): Promise<IInvoiceData> {
    const pdfFile: UploadedFile = file.pdfFile as UploadedFile;
    const data = await pdfParse(pdfFile.data);
    const inputText = data.text;
    let invoiceData: IInvoiceData = {
      consumptionHistory: [],
      clientNumber: "",
      instalationNumber: "",
      currentAccountGeneration: 0,
      client: {
        name: "",
        streetAddress: "",
        zipCode: "",
        taxIdentifier: "",
        city: "",
        state: "",
        type: "",
        stateInscription: "",
      },
      referenceData: undefined,
      emissionDate: "",
      accessKey: "",
      authorizationProtocol: "",
      invoiceCreatedAt: "",
      qrCode: "",
      automaticDebitCode: "",
      readDates: undefined,
      invoiceValues: {
        electricEnergy: {
          quantity: 0,
          unitPrice: 0,
          value: 0,
          unitTax: 0,
        },
        energiaScee: {
          quantity: 0,
          unitPrice: 0,
          value: 0,
          unitTax: 0,
        },
        energiaCompensated: {
          quantity: 0,
          unitPrice: 0,
          value: 0,
          unitTax: 0,
        },
        contribLlum: 0,
        bonusItapiu: 0,
        accountFine: undefined,
        accountTax: undefined,
        accountCorrection: undefined,
      },
      tecInfo: undefined,
      modualityTax: "",
      class: "",
      subclass: "",
      invoiceNumber: "",
      serie: 0,
    };

    // Extract consumption history
    let monthArr = [];
    let consumptionHistoryRows: CreateConsumptionHistoryExtractDto[] = [];
    const matchConsumpHist = inputText.match(
      /Histórico de Consumo[\s\S]*Reservado ao Fisco/
    );

    if (matchConsumpHist) {
      const monthsData = matchConsumpHist[0]
        .split("Histórico de Consumo")[1]
        .split("MÊS/ANOCons. kWhMédia kWh/DiaDias")[1]
        .split("Reservado ao Fisco")[0];

      const lines = monthsData.split("\n");

      for (const line of lines) {
        if (line) {
          monthArr.push(line);
        }
      }

      for (const [i, mon] of monthArr.entries()) {
        const values = mon.split(/\s+/);
        consumptionHistoryRows.push({
          monthYear: parseMonthYr(values[0]),
          consumptionKwh: Number(values[1]),
          measurementKwhPerDay: parseNumber(values[2]),
          days: Number(values[3]),
          index: i,
        });
      }
      invoiceData.consumptionHistory = consumptionHistoryRows;
      // ----------------------------------------------------------------------------------------------------------------

      // Extract Client and Installation Number

      const matchClientAndInstalNum = inputText.match(
        /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/
      );

      if (matchClientAndInstalNum) {
        invoiceData.clientNumber = matchClientAndInstalNum[1];
        invoiceData.instalationNumber = matchClientAndInstalNum[2];
      } else {
        console.log("Information not found in the PDF.");
      }
    } else {
      console.log("No match found.");
      return;
    }
    // ----------------------------------------------------------------------------------------------------------------

    // Extract Current Account Generation
    const matchCurrentAccGen = inputText.match(
      /SALDO ATUAL DE GERAÇÃO:(.*?)(?=kWh. Tarifa vigente conforme Res Aneel)/s
    );

    if (matchCurrentAccGen) {
      const currentAccGenValue = matchCurrentAccGen[1].trim();
      invoiceData.currentAccountGeneration = parseNumber(currentAccGenValue);
    } else {
      console.log("Information not found in the text.");
    }
    // ----------------------------------------------------------------------------------------------------------------

    // Extract Client Info
    let clientData: ICreateClientData = {
      type: "",
      name: "",
      streetAddress: "",
      zipCode: "",
      taxIdentifier: "",
      city: "",
      state: "",
      stateInscription: null,
    };
    const matchCClientInfo = inputText.match(
      /Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar[\s\S]* Nº DO CLIENTE                      Nº DA INSTALAÇÃO/
    );
    if (matchCClientInfo[0].includes("CNPJ")) {
      const clientInfoRows = matchCClientInfo[0].split(
        "        Nº DO CLIENTE                      Nº DA INSTALAÇÃO"
      )[0];
      clientData.type = "PJ";
      const lines = clientInfoRows.split("\n");
      const clientArr = [];

      for (let i = lines.length - 1; i > lines.length - 8; i--) {
        if (lines[i].trim()) {
          clientArr.push(lines[i]);
        }
      }
      const addressData = clientArr[2];
      const addressDataArr = addressData.split(/^(\d{5}-\d{3})\s+(.*)$/);
      const zipCode = addressDataArr[1];
      const city = addressDataArr[2].split(",")[0];
      const state = addressDataArr[2].split(",")[1].trim();
      const cnpj = clientArr[1].split("CNPJ ")[1];
      const stateInscription = clientArr[0].split("INSCRIÇÃO ESTADUAL ")[1];

      clientData.city = city;
      clientData.state = state;
      clientData.zipCode = zipCode;
      clientData.stateInscription = stateInscription;
      clientData.taxIdentifier = cnpj;
      clientData.name = clientArr[5];
      clientData.streetAddress = clientArr[4];
    } else if (matchCClientInfo[0].includes("CPF")) {
      clientData.type = "PF";
      const lines = matchCClientInfo[0].split("\n");
      lines.splice(lines.length - 1, 1);
      const cpfDataArr = [];
      for (let i = lines.length - 1; i > lines.length - 6; i--) {
        cpfDataArr.push(lines[i]);
      }
      const addressData = cpfDataArr[1];
      const addressDataArr = addressData.split(/^(\d{5}-\d{3})\s+(.*)$/);
      const zipCode = addressDataArr[1];
      const city = addressDataArr[2].split(",")[0];
      const state = addressDataArr[2].split(",")[1].trim();
      const cpf = cpfDataArr[0].split("CPF ")[1];
      clientData.streetAddress = cpfDataArr[3];
      clientData.taxIdentifier = cpf;
      clientData.city = city;
      clientData.state = state;
      clientData.zipCode = zipCode;
      clientData.name = cpfDataArr[4];
    } else {
      console.log("no data found");
    }

    invoiceData.client = clientData;
    // ----------------------------------------------------------------------------------------------------------------

    // Extract Reference Data
    const matchReferenceData = inputText.match(
      /Referente a\s+Vencimento\s+Valor a pagar \(R\$\)\s+(.*?)\s+NOTA FISCAL Nº/s
    );
    const linesReferenceData = matchReferenceData[0].split("\n");
    const referenceDataRows = [];
    let referenceData: IReferenceData = {
      refernceMonth: "",
      expirationDate: "",
      valueDue: 0,
    };

    for (const line of linesReferenceData) {
      if (line.trim()) {
        referenceDataRows.push(line);
      }
    }

    const textRefData = referenceDataRows[1];
    const valuesRefData = textRefData.split(/\s+/);
    const textRefDataRows = [];

    for (const val of valuesRefData) {
      if (val.trim()) {
        textRefDataRows.push(val);
      }
    }

    referenceData.refernceMonth = parseMonthYr(textRefDataRows[0]);
    referenceData.expirationDate = parseToIsoDate(textRefDataRows[1]);
    referenceData.valueDue = parseNumber(textRefDataRows[2]);
    invoiceData.referenceData = referenceData;
    // ----------------------------------------------------------------------------------------------------------------

    // Extract Invoivce Data Info
    const matchInvoiceDataInfo = inputText.match(
      /NOTA FISCAL Nº\s+(.*?)\s+ClasseSubclasseModalidade TarifáriaDatas de Leitura/s
    );
    const linesInvoiceData = matchInvoiceDataInfo[0].split("\n");
    linesInvoiceData.splice(2, 3);
    linesInvoiceData.splice(5, 1);
    const invoiceNumber = linesInvoiceData[0].match(/Nº(.*?)\-/)[1].trim();
    const serie = linesInvoiceData[0].match(/SÉRIE\s+(.+)/)[1];
    const emissionDate = parseToIsoDate(
      linesInvoiceData[1].split("Data de emissão: ")[1]
    );
    const accessKey = linesInvoiceData[2];
    const authorizationProtocol = linesInvoiceData[3].split(
      "Protocolo de autorização: "
    )[1];
    const invoiceCreatedAtDate = linesInvoiceData[4].match(
      /^(\d{2})\.(\d{2})\.(\d{4})/
    );
    const invoiceCreatedAtTime = linesInvoiceData[4].match(
      /(\d{2})\:(\d{2})\:(\d{2})/
    );

    invoiceData.invoiceNumber = invoiceNumber;
    invoiceData.serie = parseNumber(serie);
    invoiceData.emissionDate = emissionDate;
    invoiceData.accessKey = accessKey;
    invoiceData.authorizationProtocol = authorizationProtocol;
    invoiceData.invoiceCreatedAt = new Date(
      Number(invoiceCreatedAtDate[3]),
      Number(invoiceCreatedAtDate[2]) - 1,
      Number(invoiceCreatedAtDate[1]),
      Number(invoiceCreatedAtTime[1]),
      Number(invoiceCreatedAtTime[2]),
      Number(invoiceCreatedAtTime[3])
    ).toISOString();
    //------------------------------------------------------------------------------------------

    // Extract QR Code
    const matchQrCode = inputText.match(
      /Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar([\s\S]*)/
    );
    const linesQrCode = matchQrCode[0].split("\n");
    const qrCodeRows = [];

    for (const line of linesQrCode) {
      if (line.trim()) {
        qrCodeRows.push(line);
      }
    }
    const qrCodeData = qrCodeRows[2].split("/")[1].substring(4);
    invoiceData.qrCode = qrCodeData;
    //------------------------------------------------------------------------------------------

    // Extract Automatic Debit Code
    const matchDebitCode = inputText.match(
      /Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar\n([\s\S]*?)\n(?:Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)\/\d{4}[^\n]*(?=\n|$)/
    );
    const linesDebitCode = matchDebitCode[0].split("\n");
    const debitCodeRows = [];

    for (const line of linesDebitCode) {
      if (line.trim()) {
        debitCodeRows.push(line);
      }
    }
    const debitRowsData = debitCodeRows[1]
      .split("R$")[0]
      .split(/(\d{2})\/(\d{2})\/(\d{4})/)[0]
      .substring(0, 12);
    invoiceData.automaticDebitCode = debitRowsData;
    //------------------------------------------------------------------------------------------

    // Extract Class Data
    const matchClass = inputText.match(
      /ClasseSubclasseModalidade TarifáriaDatas de Leitura\n([\s\S]*?)\nInformações Técnicas/
    );
    const linesClass = matchClass[0].split("\n");
    const classRows = [];

    for (const line of linesClass) {
      if (line.trim()) {
        classRows.push(line);
      }
    }
    const classRowsData = classRows[1];
    const classData = classRowsData.substring(0, 3);
    let classText, subClassText, modualityTax;
    if (classData.substring(0, 3) === "Com") {
      classText = "Comercial Bifasico";
      if (classRowsData.includes("ComercialComercial")) {
        subClassText = "Comercial";
        const matchConvencional = classRowsData.match(
          /^ComercialComercial Convencional([\s\S]*)AnteriorAtualNº de diasPróxima/
        );
        modualityTax = `Convencional ${matchConvencional[1].replace(
          /\s+/,
          ""
        )}`;
      } else if (classRowsData.includes("Serviços de")) {
        subClassText = "Serviços de Comunic. Telec";
        const matchConvencional = classRowsData.match(
          /Serviços de([\s\S]*)AnteriorAtualNº de diasPróxima/
        );
        modualityTax = `Convencional ${matchConvencional[1].replace(
          /\s+/,
          ""
        )}`;
      }
    }

    if (classData.substring(0, 3) === "Res") {
      classText = "Residencial Bifasico";
      if (classRowsData.includes("ResidencialResidencial")) {
        subClassText = "Residencial";
        const matchConvencional = classRowsData.match(
          /^ResidencialResidencial Convencional([\s\S]*)AnteriorAtualNº de diasPróxima/
        );
        modualityTax = `Convencional ${matchConvencional[1].replace(
          /\s+/,
          ""
        )}`;
      }
    }

    const classRowsText2 = classRows[2];
    const readDatesText = classRows[2].substring(classRowsText2.length - 18);
    const readDateAnterior = readDatesText.substring(0, 5);
    const readDateCurrent = readDatesText.substring(5, 10);
    const readDateDays = readDatesText.substring(11, 13);
    const readDateNextRead = readDatesText.substring(13, 18);
    const readDates: IReadDates = {
      nextRead: "",
      days: 0,
      anterior: "",
      current: "",
    };
    readDates.nextRead = parseToIsoDate(
      `${readDateNextRead}/${this.handleNextPrevYear(readDateNextRead)}`
    );
    readDates.days = Number(readDateDays);
    readDates.anterior = parseToIsoDate(
      `${readDateAnterior}/${this.handleNextPrevYear(readDateAnterior)}`
    );
    readDates.current = parseToIsoDate(
      `${readDateCurrent}/${this.handleNextPrevYear(readDateCurrent)}`
    );
    invoiceData.modualityTax = modualityTax;
    invoiceData.class = classText;
    invoiceData.subclass = subClassText;
    invoiceData.readDates = readDates;
    //------------------------------------------------------------------------------------------

    // Extract Invoice Values
    let invoiceValues: IInvoiceValuesData = {
      electricEnergy: {
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0,
      },
      energiaScee: {
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0,
      },
      energiaCompensated: {
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0,
      },
      contribLlum: 0,
      bonusItapiu: 0,
      accountFine: undefined,
      accountTax: undefined,
      accountCorrection: undefined,
    };
    const electricEnergy: IEnergyData = {
      quantity: 0,
      unitPrice: 0,
      value: 0,
      unitTax: 0,
    };

    const matchInvVal = inputText.match(/ICMSICMS(.*?TOTAL)/s);
    const invoiceValuesText = matchInvVal[0]
      .split("TOTAL")[0]
      .split("ICMSICMS")[1];

    // Energia eletrica
    const matchElectricEnergy = invoiceValuesText.match(
      /Energia ElétricakWh.*$/gm
    );

    if (matchElectricEnergy) {
      const electricEnergyData = matchElectricEnergy[0].split(/\s+/);
      electricEnergy.quantity = parseNumber(electricEnergyData[2]);
      electricEnergy.unitPrice = parseNumber(electricEnergyData[3]);
      electricEnergy.value = parseNumber(electricEnergyData[4]);
      electricEnergy.unitTax = parseNumber(electricEnergyData[5]);
      invoiceValues.electricEnergy = electricEnergy;
    }

    // Extract Energy SCEE Data
    const energiaScee: IEnergyData = {
      quantity: 0,
      unitPrice: 0,
      value: 0,
      unitTax: 0,
    };
    const matchElectricScee = invoiceValuesText.match(
      /Energia SCEE s\/ ICMSkWh.*$/gm
    );

    if (matchElectricScee) {
      const energiaSceeData = matchElectricScee[0]
        .split("Energia SCEE s/ ICMSkWh")[1]
        .trim()
        .split(/\s+/);
      energiaScee.quantity = parseNumber(energiaSceeData[0]);
      energiaScee.unitPrice = parseNumber(energiaSceeData[1]);
      energiaScee.value = parseNumber(energiaSceeData[2]);
      energiaScee.unitTax = parseNumber(energiaSceeData[3]);
      invoiceValues.energiaScee = energiaScee;
    }

    // Extract Energy Compensada Data
    const energiaCompensated: IEnergyData = {
      quantity: 0,
      unitPrice: 0,
      value: 0,
      unitTax: 0,
    };
    const matchEnergyCompensated = invoiceValuesText.match(
      /Energia compensada GD IkWh.*$/gm
    );
    if (matchEnergyCompensated) {
      const energiaCompensatedData = matchEnergyCompensated[0]
        .trim()
        .split("Energia compensada GD IkWh")[1]
        .trim()
        .split(/\s+/);
      energiaCompensated.quantity = parseNumber(energiaCompensatedData[0]);
      energiaCompensated.unitPrice = parseNumber(energiaCompensatedData[1]);
      energiaCompensated.value = parseNumber(energiaCompensatedData[2]);
      energiaCompensated.unitTax = parseNumber(energiaCompensatedData[3]);
      invoiceValues.energiaCompensated = energiaCompensated;
    }

    // Extract Energy Contrib Ilum Publica Municipal
    const matchContribIlum = invoiceValuesText.match(
      /Contrib Ilum Publica Municipal.*$/gm
    );

    if (matchContribIlum) {
      const contribLlumData = matchContribIlum[0]
        .trim()
        .split("Contrib Ilum Publica Municipal")[1]
        .trim()
        .split(/\s+/);
      invoiceValues.contribLlum = parseNumber(contribLlumData[0]);
    }

    // Extract Bonus Itapiu
    const matchBonusItapiu = invoiceValuesText.match(
      /Bônus Itaipu art 21 Lei 10438.*$/gm
    );
    if (matchBonusItapiu) {
      const bonusItapiuData = matchBonusItapiu[0]
        .trim()
        .split("Bônus Itaipu art 21 Lei 10438")[1]
        .trim()
        .split(/\s+/);
      invoiceValues.bonusItapiu = parseNumber(bonusItapiuData[0]);
    }

    // Extract Account fine data
    const matchAccountFine = invoiceValuesText.match(
      /Multa 2% sobre conta de.*$/gm
    );
    if (matchAccountFine) {
      let accountFine: IAccountFineData = {
        accountMonth: "",
        accountValue: 0
      };
      accountFine.accountMonth = parseMonthYr(
        matchAccountFine[0].match(/(\d{2})\/(\d{4})/)[0]
      );
      accountFine.accountValue = parseNumber(
        matchAccountFine[0].match(/\d{1,3}(.\d{3})*(,\d{1,2})?$/)[0]
      );
      invoiceValues.accountFine = accountFine;
    }

    // Extract Account tax data
    const matchAccountTax = invoiceValuesText.match(
      /Juros 1%am sobre conta.*$/gm
    );

    if (matchAccountTax) {
      const accountTaxData: IAccountTaxData = {
        accountMonth: "",
        accountValue: 0,
        accountDatePaid: "",
      };
      const accountTaxMonth = matchAccountTax[0].match(/(\d{2})\/(\d{2})/)[0];
      const accountTaxDatePaid = matchAccountTax[0].match(
        /(\d{2})\/(\d{2})\/(\d{2})/
      )[0];
      const accountTaxValue = matchAccountTax[0].match(
        /\d{1,3}(.\d{3})*(,\d{1,2})?$/
      )[0];
      accountTaxData.accountMonth = parseMonthYr(accountTaxMonth);
      accountTaxData.accountDatePaid = parseToIsoDate(accountTaxDatePaid);
      accountTaxData.accountValue = parseNumber(accountTaxValue);
      invoiceValues.accountTax = accountTaxData;
    }

    // Extract Correction Account data
    const matchCorrectionAccount = invoiceValuesText.match(
      /Correção IPCA\/IGPM s\/ conta.*$/gm
    );

    if (matchCorrectionAccount) {
      let correctionAccountData: IAccountCorrectionData = {
        accountMonth: "",
        accountDatePaid: "",
        accountValue: 0,
      };
      const correctionAccountMonth =
        matchCorrectionAccount[0].match(/(\d{2})\/(\d{2})/)[0];
      const correctionAccountDatePaid = matchCorrectionAccount[0].match(
        /(\d{2})\/(\d{2})\/(\d{2})/
      )[0];
      const correctionAccountValue = matchCorrectionAccount[0].match(
        /\d{1,3}(.\d{3})*(,\d{1,2})?$/
      )[0];
      correctionAccountData.accountMonth = parseMonthYr(correctionAccountMonth);
      correctionAccountData.accountDatePaid = parseToIsoDate(
        correctionAccountDatePaid
      );
      correctionAccountData.accountValue = parseNumber(correctionAccountValue);
      invoiceValues.accountCorrection = correctionAccountData;
    }
    invoiceData.invoiceValues = invoiceValues;
    // --------------------------------------------------------------------------------------------------------------------------

    // Extract Tecnical Information
    const matchTecInfo = inputText.match(
      /AnteriorAtualde Multiplicação([\s\S]*)DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICASEGUNDA VIA/
    );

    const tecInfoData: ITechInfoData = {
      measurementType: "",
      measurement: "",
      lastRead: 0,
      currentRead: 0,
      multiplicationConstatnt: 0,
      consumptionKwh: 0,
    };
    const tecInfoText = matchTecInfo[0]
      .split("AnteriorAtualde Multiplicação")[1]
      .split(
        "DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICASEGUNDA VIA"
      )[0]
      .replace(/\s+/g, "");
    const measurementType = tecInfoText.split("kWh")[0];
    const measurement = tecInfoText.split("kWh")[1].substring(0, 12);

    let lastRead;
    let currentRead;
    let multiplicationConstatnt, consumptionKwh;
    let readVals = tecInfoText
      .split("kWh")[1]
      .substring(12)
      .match(/(\d+).(\d{3})/g);
    lastRead = readVals[0];
    currentRead = readVals[1];
    if (readVals.length === 3) {
      multiplicationConstatnt = readVals[2].charAt(0);
      consumptionKwh = readVals[2].substring(1);
    } else {
      let readVals2 = tecInfoText
        .split("kWh")[1]
        .substring(12)
        .split(/(\d+).(\d{3})/g)[6];
      multiplicationConstatnt = readVals2[0];
      consumptionKwh = readVals2.substring(1);
    }

    tecInfoData.measurementType = `${measurementType} kWh`;
    tecInfoData.measurement = measurement;
    tecInfoData.lastRead = parseNumber(lastRead);
    tecInfoData.currentRead = parseNumber(currentRead);
    tecInfoData.multiplicationConstatnt = parseNumber(multiplicationConstatnt);
    tecInfoData.consumptionKwh = parseNumber(consumptionKwh);

    invoiceData.tecInfo = tecInfoData;
    //----------------------------------------------------------------

    invoiceData.invoiceValues = invoiceValues;
    return invoiceData;
  }

  private handleNextPrevYear(value: string) {
    let val = value.split("/")[1];
    if (val === "12") return new Date().getFullYear() + 1;
    else if (val === "01") return new Date().getFullYear() - 1;
    return new Date().getFullYear();
  }
}
