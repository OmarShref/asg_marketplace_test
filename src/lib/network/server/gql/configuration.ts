import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";

export async function getConfiguration({
  params,
}: ServerReqProps): Promise<ConfigurationModel> {
  const configurationQuery = `{
    vestedConfig {
        config {
            home_page
            mobile
            phone
            email
            whatsapp
            landing_pages {
                label
                position
                page_identifier
            }
            landing_pages_desktop {
                label
                position
                page_identifier
            }
            static_pages {
                label
                value
            }
            social_accounts {
                key
                value
            }
            websites {
                country_code
                name
                website_flag
            }
            storeConfig {
                default_title
                default_description
                default_keywords
                store_group_code
                shipping_data {
                    free_shipping
                    time_option
                    days_in_riyadh
                    days_out_riyadh
                }
            }
            installments {
              tamara_allow
              tabby_allow
              emkan_allow
              tamara_public_key
              max_months
              interest_rate
           }
        }
    }
    vestedCountry(filter: { Country_id: { eq: "${params?.storeCode?.slice(
      0,
      2,
    )}" } }) {
        country_id
        available_regions {
            id
            name
            arabic_name
        }
    }
}
`;

  const data = await new ServerGqlGetRequest({
    storeCode: params?.storeCode,
    query: configurationQuery,
  }).getData();

  const configuration = new ConfigurationModel({
    configurationData: data,
  }).create();

  return configuration;
}
