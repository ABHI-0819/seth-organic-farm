# frozen_string_literal: true

if defined?(Deface)
Deface::Override.new(
  virtual_path: 'spree/admin/orders/index',
  name: 'add_farm_columns_to_orders_index_header',
  insert_before: "th.actions",
  text: <<-HTML
    <th>Phone</th>
    <th>PIN Code</th>
    <th>Handling / Fragile</th>
  HTML
)
end
