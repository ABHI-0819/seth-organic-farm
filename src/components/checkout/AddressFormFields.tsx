"use client";

import type { Country, State } from "@spree/sdk";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { AddressFormData } from "@/lib/utils/address";

interface AddressFormFieldsProps {
  address: AddressFormData;
  countries: Country[];
  states: State[];
  loadingStates: boolean;
  onChange: (field: keyof AddressFormData, value: string) => void;
  idPrefix: string;
}

export function AddressFormFields({
  address,
  countries,
  states,
  loadingStates,
  onChange,
  idPrefix,
}: AddressFormFieldsProps) {
  const t = useTranslations("address");
  const tc = useTranslations("common");
  const hasStates = states.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Country — full width, floating label style */}
      <div className="relative">
        <NativeSelect
          id={`${idPrefix}-country`}
          aria-label={t("country")}
          className="w-full"
          value={address.country_iso}
          onChange={(e) => onChange("country_iso", e.target.value)}
          required
        >
          <NativeSelectOption value="" disabled>
            {t("selectCountry")}
          </NativeSelectOption>
          {countries.map((country) => (
            <NativeSelectOption key={country.iso} value={country.iso}>
              {country.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {/* First name / Last name */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          id={`${idPrefix}-first_name`}
          aria-label={t("firstName")}
          value={address.first_name}
          onChange={(e) => onChange("first_name", e.target.value)}
          placeholder={t("firstName")}
        />
        <Input
          type="text"
          id={`${idPrefix}-last_name`}
          aria-label={t("lastName")}
          required
          value={address.last_name}
          onChange={(e) => onChange("last_name", e.target.value)}
          placeholder={t("lastName")}
        />
      </div>

      {/* Company */}
      <Input
        type="text"
        id={`${idPrefix}-company`}
        aria-label={t("company")}
        value={address.company}
        onChange={(e) => onChange("company", e.target.value)}
        placeholder={t("company")}
      />

      {/* Address */}
      <Input
        type="text"
        id={`${idPrefix}-address1`}
        aria-label={t("address")}
        required
        value={address.address1}
        onChange={(e) => onChange("address1", e.target.value)}
        placeholder={t("address")}
      />

      {/* Apartment */}
      <Input
        type="text"
        id={`${idPrefix}-address2`}
        aria-label={t("apartment")}
        value={address.address2}
        onChange={(e) => onChange("address2", e.target.value)}
        placeholder={t("apartment")}
      />

      {/* City / State / ZIP — 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        <Input
          type="text"
          id={`${idPrefix}-postal_code`}
          aria-label={t("zipCode")}
          required
          value={address.postal_code}
          onChange={async (e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            onChange("postal_code", val);
            if (
              val.length === 6 &&
              (address.country_iso?.toLowerCase() === "in" ||
                !address.country_iso)
            ) {
              try {
                const res = await fetch(
                  `https://api.postalpincode.in/pincode/${val}`,
                );
                const data = await res.json();
                if (data[0]?.Status === "Success" && data[0].PostOffice?.[0]) {
                  const po = data[0].PostOffice[0];
                  onChange("city", po.District || po.Block || "");
                  if (po.State) {
                    onChange("state_name", po.State);
                  }
                }
              } catch {
                // Ignore API failures and preserve manual input
              }
            }
          }}
          placeholder="PIN Code (6 digits)"
          maxLength={6}
          className="font-mono text-xs"
        />
        <Input
          type="text"
          id={`${idPrefix}-city`}
          aria-label={t("city")}
          required
          value={address.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder={t("city")}
        />
        {loadingStates ? (
          <NativeSelect
            id={`${idPrefix}-state`}
            aria-label={t("stateProvince")}
            className="w-full"
            disabled
          >
            <NativeSelectOption value="">{tc("loading")}</NativeSelectOption>
          </NativeSelect>
        ) : hasStates ? (
          <NativeSelect
            id={`${idPrefix}-state`}
            aria-label={t("stateProvince")}
            className="w-full"
            value={address.state_abbr}
            onChange={(e) => onChange("state_abbr", e.target.value)}
            required
          >
            <NativeSelectOption value="" disabled>
              {t("selectState")}
            </NativeSelectOption>
            {states.map((state) => (
              <NativeSelectOption key={state.abbr} value={state.abbr}>
                {state.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        ) : (
          <Input
            type="text"
            id={`${idPrefix}-state`}
            aria-label={t("stateProvince")}
            value={address.state_name}
            onChange={(e) => onChange("state_name", e.target.value)}
            placeholder={t("stateProvince")}
          />
        )}
      </div>

      {/* Phone with Indian Mobile Validation */}
      <div>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-[#F4EFEA] border border-r-0 border-[#E6E1D8] rounded-l-md text-xs font-semibold text-[#52796F]">
            +91
          </span>
          <Input
            type="tel"
            id={`${idPrefix}-phone`}
            aria-label={t("phone")}
            required
            value={address.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              onChange("phone", val);
            }}
            placeholder="10-digit mobile (for dispatch WhatsApp)"
            maxLength={10}
            className="rounded-l-none font-mono text-xs"
          />
        </div>
        {address.phone &&
          address.phone.length > 0 &&
          address.phone.length !== 10 && (
            <p className="text-red-500 text-[10px] mt-1">
              Please enter a valid 10-digit Indian mobile number
            </p>
          )}
      </div>
    </div>
  );
}
