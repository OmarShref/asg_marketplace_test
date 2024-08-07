export const gqlCategoryInnerItem = `
    total_count
    items {
        name
        entity_id
        sku
        special_to_date
        small_image
        media_gallery {
          value
        }
        url
        brand
        price_range {
            minimum_price {
                regular_price {
                    value
                    currency
                }
                final_price {
                    value
                    currency
                }
                discount {
                    percent_off
                    amount_off
                }
            }
        }
        categories {
          id
          name
          url
          url_key
        }
        configurable_attributes {
          attribute_code
          label
          values {
              uuid
              is_available
              option_id
              value
              swatch_data {
                  is_swatch
                  swatch_type
                  swatch_value
              }
          }
        }
        labels {
            type
            image
            image_size
            name
            position
            label_text
            text_style
            redirect_url
            active_from
            active_to
        }
    }
    page_info {
      page_size
      total_pages
      current_page_or_offset
    }
    facet_result {
        count
        label
        attribute_code
        filter_attribute
        min
        max
        options {
            count
            label
            value
            is_swatch
            swatch_type
            swatch_value
        }
    }
`;
