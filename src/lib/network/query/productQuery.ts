export const gqlProductInnerItem = `
            entity_id
            type_id
            name
            sku
            is_in_stock
            salable_qty
            special_to_date
            meta_title
            meta_keyword
            meta_description
            url
            brand
            rating_summary
            reviews_count
            small_image
            media_gallery {
                value
            }
            description {
                html
            }
            short_description {
                html
            }
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
            attributes {
                attribute_code
                is_html_allowed_on_front
                label
                used_in_product_listing
                value
            }
            categories {
                id
                name
                url
                url_key
            }
            reviewItems {
                items {
                    review_id
                    nickname
                    created_at
                    title
                    detail
                    vote_value
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
`;
