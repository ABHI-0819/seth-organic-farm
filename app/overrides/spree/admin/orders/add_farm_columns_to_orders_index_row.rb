# frozen_string_literal: true

if defined?(Deface)
Deface::Override.new(
  virtual_path: 'spree/admin/orders/index',
  name: 'add_farm_columns_to_orders_index_row',
  insert_before: "td.actions",
  text: <<-HTML
    <td class="font-mono text-xs">
      <%= order.ship_address&.phone || order.bill_address&.phone || '-' %>
    </td>
    <td class="font-mono text-xs font-semibold">
      <%= order.ship_address&.zipcode || '-' %>
    </td>
    <td>
      <% if order.line_items.any? { |li| li.variant.product.shipping_category&.name&.include?('Fragile') } %>
        <span class="badge badge-warning bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-xs font-bold">
          ⚠️ FRAGILE GLASS
        </span>
      <% else %>
        <span class="badge badge-light text-muted text-xs">Standard</span>
      <% end %>
    </td>
  HTML
)
end
