-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "instalation_number" VARCHAR(255) NOT NULL,
    "reference_month" DATE NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "value_due" DECIMAL(10,2) NOT NULL,
    "invoice_number" VARCHAR(255) NOT NULL,
    "serie" INTEGER NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "access_key" VARCHAR(255) NOT NULL,
    "authorization_protocol" VARCHAR(255) NOT NULL,
    "invoice_created_at" TIMESTAMPTZ NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "subclass" VARCHAR(255) NOT NULL,
    "moduality_tax" VARCHAR(255) NOT NULL,
    "last_read_date" DATE NOT NULL,
    "current_read_date" DATE NOT NULL,
    "number_days" INTEGER NOT NULL,
    "next_read_date" DATE NOT NULL,
    "client_id" INTEGER NOT NULL,
    "measurement_type" VARCHAR(255) NOT NULL,
    "measurement" VARCHAR(50) NOT NULL,
    "last_read_value" DECIMAL(10,3) NOT NULL,
    "current_read_value" DECIMAL(10,3) NOT NULL,
    "multiplication_constant" INTEGER NOT NULL,
    "consumption_kwh" INTEGER NOT NULL,
    "qr_code" VARCHAR(255) NOT NULL,
    "current_account_generation" DECIMAL(10,2) NOT NULL,
    "invoice_value_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "client_number" VARCHAR(255) NOT NULL,
    "street_address" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(255) NOT NULL,
    "tax_identifier" VARCHAR(255) NOT NULL,
    "state_inscription" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumption_history" (
    "id" SERIAL NOT NULL,
    "month_year" VARCHAR(255) NOT NULL,
    "consumption_kwh" DECIMAL(10,3) NOT NULL,
    "measurement_kwh_per_day" DECIMAL(10,2) NOT NULL,
    "days" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "invoice_number" VARCHAR(255) NOT NULL,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "consumption_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_values" (
    "id" SERIAL NOT NULL,
    "electric_energy_id" INTEGER NOT NULL,
    "energy_scee_id" INTEGER NOT NULL,
    "energy_compensated_id" INTEGER NOT NULL,
    "contrib_llum_public_municipal_val" DECIMAL(10,2) NOT NULL,
    "bonus_itaipu_val" DECIMAL(10,2),
    "account_fine_id" INTEGER,
    "account_tax_id" INTEGER,
    "account_correction_id" INTEGER,

    CONSTRAINT "invoice_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electric_energy" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,8) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "unit_tax" DECIMAL(10,8) NOT NULL,

    CONSTRAINT "electric_energy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energy_scee" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,8) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "unit_tax" DECIMAL(10,8) NOT NULL,

    CONSTRAINT "energy_scee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energy_compensated" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,8) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "unit_tax" DECIMAL(10,8) NOT NULL,

    CONSTRAINT "energy_compensated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_fine" (
    "id" SERIAL NOT NULL,
    "account_month" DATE NOT NULL,
    "account_value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "account_fine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_tax" (
    "id" SERIAL NOT NULL,
    "account_value" DECIMAL(10,2) NOT NULL,
    "account_month" DATE NOT NULL,
    "account_date_paid" DATE NOT NULL,

    CONSTRAINT "account_tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_correction" (
    "id" SERIAL NOT NULL,
    "account_value" DECIMAL(10,2) NOT NULL,
    "account_month" DATE NOT NULL,
    "account_date_paid" DATE NOT NULL,

    CONSTRAINT "account_correction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoice_value_id_key" ON "invoices"("invoice_value_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_electric_energy_id_key" ON "invoice_values"("electric_energy_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_energy_scee_id_key" ON "invoice_values"("energy_scee_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_energy_compensated_id_key" ON "invoice_values"("energy_compensated_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_account_fine_id_key" ON "invoice_values"("account_fine_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_account_tax_id_key" ON "invoice_values"("account_tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_values_account_correction_id_key" ON "invoice_values"("account_correction_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoice_value_id_fkey" FOREIGN KEY ("invoice_value_id") REFERENCES "invoice_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumption_history" ADD CONSTRAINT "consumption_history_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_electric_energy_id_fkey" FOREIGN KEY ("electric_energy_id") REFERENCES "electric_energy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_energy_scee_id_fkey" FOREIGN KEY ("energy_scee_id") REFERENCES "energy_scee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_energy_compensated_id_fkey" FOREIGN KEY ("energy_compensated_id") REFERENCES "energy_compensated"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_account_fine_id_fkey" FOREIGN KEY ("account_fine_id") REFERENCES "account_fine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_account_tax_id_fkey" FOREIGN KEY ("account_tax_id") REFERENCES "account_tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_account_correction_id_fkey" FOREIGN KEY ("account_correction_id") REFERENCES "account_correction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
