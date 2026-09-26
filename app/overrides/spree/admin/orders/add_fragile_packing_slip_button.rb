# frozen_string_literal: true

if defined?(Deface)
Deface::Override.new(
  virtual_path: 'spree/admin/orders/index',
  name: 'add_fragile_packing_slip_button',
  insert_top: "td.actions",
  text: <<-HTML
    <%= link_to print_packing_slip_admin_order_path(order),
                target: '_blank',
                class: 'btn btn-sm btn-outline-secondary mr-1',
                title: 'Print 4x6 Glass Packing Slip & Warning Label' do %>
      <i class="bi bi-printer"></i> Slip
    <% end rescue nil %>
  HTML
)
end
