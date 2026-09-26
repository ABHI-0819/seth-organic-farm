# frozen_string_literal: true

# Load Spree core seed data (Countries, States, Zones, Roles) safely
begin
  Spree::Core::Engine.load_seed if defined?(Spree::Core)
rescue StandardError => e
  puts "Spree core seeds already initialized: #{e.message}"
end

ActiveRecord::Base.transaction do
  puts "======================================================================"
  puts "==> Step 1: PURGING SAMPLE ARTIFACTS & DUMMY SEED DATA..."
  puts "======================================================================"

  # 1. Clear sample promotions, rules, actions, and vouchers
  if defined?(Spree::Promotion)
    puts "  -> Purging sample promotions and promo codes..."
    Spree::Promotion.destroy_all
    Spree::PromotionRule.destroy_all if defined?(Spree::PromotionRule)
    Spree::PromotionAction.destroy_all if defined?(Spree::PromotionAction)
    Spree::PromotionCategory.destroy_all if defined?(Spree::PromotionCategory)
    Spree::PromotionCode.destroy_all if defined?(Spree::PromotionCode)
  end

  # 2. Identify & remove dummy/clothing/electronics sample taxons and taxonomies
  puts "  -> Purging legacy dummy taxonomies and sample taxons..."
  dummy_taxon_names = [
    "Clothing", "Bags", "Mugs", "Caps", "Accessories", "T-Shirts",
    "Air Fryers", "Coffee Machines", "Kettles", "Blenders", "Kitchen",
    "Food Processors", "Toasters", "Air Purifiers", "Humidifiers",
    "Air & Climate", "Fans", "Steam Generators", "Handheld Steamers",
    "Cordless Vacuums", "Garment Care", "Irons", "Upright Vacuums",
    "Floor Care", "Robot Vacuums", "Hair Dryers", "Hair Straighteners",
    "Trimmers", "Electric Shavers", "Personal Care"
  ]
  Spree::Taxon.where(name: dummy_taxon_names).destroy_all

  # 3. Purge legacy dummy OptionTypes, OptionValues, and unused sample records
  puts "  -> Purging legacy dummy option types..."
  Spree::OptionType.where.not(name: ["ghee-volume", "volume"]).destroy_all rescue nil

  # 4. Purge dummy/sample products
  dummy_slugs = ["spree-t-shirt", "spree-mug", "spree-tote", "spree-cap", "spree-bag"]
  Spree::Product.where("slug ILIKE ANY (array[?])", dummy_slugs.map { |s| "%#{s}%" }).destroy_all

  puts "======================================================================"
  puts "==> Step 2: CONFIGURING STORE (Seth Organic Farm)..."
  puts "======================================================================"
  store = Spree::Store.default || Spree::Store.first_or_create!(
    code: "seth-organic-farm",
    name: "Seth Organic Farm"
  )
  store.update!(
    name: "Seth Organic Farm",
    url: "https://sethorganicfarm.com",
    mail_from_address: "orders@sethorganicfarm.com",
    customer_support_email: "care@sethorganicfarm.com",
    default_currency: "INR",
    supported_currencies: "INR,USD",
    default_locale: "en",
    supported_locales: "en,en-IN",
    seo_title: "Seth Organic Farm | Pure Vedic A2 Gir Cow Ghee & Cold-Pressed Staples",
    meta_description: "Direct farm-to-table natural food. Hand-churned Vedic Bilona A2 Desi Gir Cow Ghee, wood cold-pressed oils, and certified organic seasonal produce."
  )

  puts "======================================================================"
  puts "==> Step 3: SEEDING SHIPPING CATEGORIES & STOCK LOCATIONS..."
  puts "======================================================================"
  fragile_glass_cat = Spree::ShippingCategory.find_or_create_by!(name: "Fragile Glass & Ambient")
  perishable_express_cat = Spree::ShippingCategory.find_or_create_by!(name: "Perishable Farm Express")
  standard_staples_cat = Spree::ShippingCategory.find_or_create_by!(name: "Standard Farm Produce")

  # Ensure shipping methods include all farm shipping categories
  Spree::ShippingMethod.all.each do |sm|
    sm.shipping_categories << fragile_glass_cat unless sm.shipping_categories.include?(fragile_glass_cat)
    sm.shipping_categories << perishable_express_cat unless sm.shipping_categories.include?(perishable_express_cat)
    sm.shipping_categories << standard_staples_cat unless sm.shipping_categories.include?(standard_staples_cat)
  end

  india = Spree::Country.find_by(iso: "IN") || Spree::Country.first
  stock_location = Spree::StockLocation.where(name: "Seth Organic Farm HQ - Jaipur").first_or_create!(
    address1: "Farm Sector 4, Chaksu Agrarian Belt",
    city: "Jaipur",
    state_name: "Rajasthan",
    country: india,
    zipcode: "303901",
    phone: "+91 98290 12345",
    active: true,
    backorderable_default: false
  )

  puts "======================================================================"
  puts "==> Step 4: SEEDING ORGANIC TAXONOMIES & OPTION TYPES..."
  puts "======================================================================"
  taxonomy = Spree::Taxonomy.find_or_create_by!(name: "Collections", store: store)
  root_taxon = taxonomy.root

  taxon_ghee = Spree::Taxon.find_or_create_by!(name: "Vedic A2 Dairy & Ghee", taxonomy: taxonomy, parent: root_taxon)
  taxon_oils = Spree::Taxon.find_or_create_by!(name: "Wood Cold-Pressed Oils", taxonomy: taxonomy, parent: root_taxon)
  taxon_harvest = Spree::Taxon.find_or_create_by!(name: "Seasonal Harvest Orchards", taxonomy: taxonomy, parent: root_taxon)

  volume_opt = Spree::OptionType.find_or_create_by!(name: "ghee-volume") do |ot|
    ot.presentation = "Volume & Packaging"
  end

  opt_500 = volume_opt.option_values.find_by("LOWER(name) = ?", "500ml") ||
            volume_opt.option_values.create!(name: "500ml", presentation: "500ml UV Glass Jar")

  opt_1l = volume_opt.option_values.find_by("LOWER(name) = ?", "1l") ||
           volume_opt.option_values.create!(name: "1L", presentation: "1 Litre UV Glass Jar")

  opt_5l = volume_opt.option_values.find_by("LOWER(name) = ?", "5l") ||
           volume_opt.option_values.create!(name: "5L", presentation: "5 Litre Food-Grade Brass/Tin Canister")

  # Standard Tax Category
  tax_category = Spree::TaxCategory.first_or_create!(name: "Standard Organic Food", is_default: true)

  puts "======================================================================"
  puts "==> Step 5: SEEDING REALISTIC SETH ORGANIC FARM PRODUCTS..."
  puts "======================================================================"

  # ---------------------------------------------------------------------------
  # Product 1 [Configurable Hero Item]: Traditional Bilona A2 Desi Gir Cow Ghee
  # ---------------------------------------------------------------------------
  puts "  -> Product 1: Traditional Bilona A2 Desi Gir Cow Ghee..."
  ghee = Spree::Product.find_or_initialize_by(slug: "traditional-bilona-a2-desi-gir-cow-ghee")
  ghee.assign_attributes(
    name: "Traditional Bilona A2 Desi Gir Cow Ghee",
    description: "Crafted strictly according to Vedic scriptures: Whole A2 curd from grass-fed Gir cows is churned bi-directionally using wooden Bilona, then gently slow-cooked over earthen chulhas. Stored in UV-protective amber glass to preserve live enzymes and golden medicinal aroma. 100% Pure Vedic Bilona method, Glass packaging, Perishable/fragile handling.",
    available_on: 1.day.ago,
    status: "active",
    shipping_category: fragile_glass_cat,
    tax_category: tax_category,
    stores: [store],
    taxons: [taxon_ghee],
    price: 1450.00
  )
  ghee.save!
  ghee.master.update!(sku: "SOF-GHEE-MASTER", weight: 0.85)
  ghee.option_types << volume_opt unless ghee.option_types.include?(volume_opt)

  # Variant 1: 500ml UV Glass Jar (₹1,450)
  v500 = ghee.variants.find_or_initialize_by(sku: "SOF-GHEE-500ML")
  v500.assign_attributes(
    price: 1450.00,
    weight: 0.85,
    option_values: [opt_500],
    track_inventory: true
  )
  v500.save!
  v500.stock_items.find_or_create_by!(stock_location: stock_location).update!(count_on_hand: 50, backorderable: false)

  # Variant 2: 1L UV Glass Jar (₹2,800)
  v1l = ghee.variants.find_or_initialize_by(sku: "SOF-GHEE-1L")
  v1l.assign_attributes(
    price: 2800.00,
    weight: 1.65,
    option_values: [opt_1l],
    track_inventory: true
  )
  v1l.save!
  v1l.stock_items.find_or_create_by!(stock_location: stock_location).update!(count_on_hand: 30, backorderable: false)

  # Variant 3: 5L Tin Canister (₹13,500) - Low stock trigger at 5 units
  v5l = ghee.variants.find_or_initialize_by(sku: "SOF-GHEE-5L")
  v5l.assign_attributes(
    price: 13500.00,
    weight: 5.50,
    option_values: [opt_5l],
    track_inventory: true
  )
  v5l.save!
  v5l.stock_items.find_or_create_by!(stock_location: stock_location).update!(count_on_hand: 5, backorderable: false)

  # ---------------------------------------------------------------------------
  # Product 2 [Physical Staple Item]: Wood Cold-Pressed Yellow Mustard Oil (1L)
  # ---------------------------------------------------------------------------
  puts "  -> Product 2: Wood Cold-Pressed Yellow Mustard Oil (1L)..."
  mustard = Spree::Product.find_or_initialize_by(slug: "wood-cold-pressed-yellow-mustard-oil-1l")
  mustard.assign_attributes(
    name: "Wood Cold-Pressed Yellow Mustard Oil (1L)",
    description: "Pressed at low speeds in traditional wooden Kolhu (Kachi Ghani) below 38°C. Naturally cold-filtered, pungent, rich in Omega-3 and natural antioxidants. Single-source yellow mustard seeds from Rajasthan organic plots.",
    available_on: 1.day.ago,
    status: "active",
    shipping_category: fragile_glass_cat,
    tax_category: tax_category,
    stores: [store],
    taxons: [taxon_oils],
    price: 380.00
  )
  mustard.save!
  mustard.master.update!(sku: "SOF-OIL-MUST-1L", weight: 1.10, track_inventory: true)
  mustard.master.stock_items.find_or_create_by!(stock_location: stock_location).update!(count_on_hand: 100, backorderable: false)

  # ---------------------------------------------------------------------------
  # Product 3 [Perishable Batch / Pre-Order Item]: Seasonal Alphonso Mango Crate
  # ---------------------------------------------------------------------------
  puts "  -> Product 3: Seasonal Organic Alphonso Mango Crate (Harvest Batch #1)..."
  mango = Spree::Product.find_or_initialize_by(slug: "seasonal-organic-alphonso-mango-crate")
  mango.assign_attributes(
    name: "Seasonal Organic Alphonso Mango Crate (Harvest Batch #1)",
    description: "Tree-ripened, GI-tagged authentic Alphonso mangoes from chemical-free orchards. Hand-picked at daybreak, packed in straw-cushioned wooden crates. Pre-order batch with scheduled dispatch: Harvest Batch #1 dispatches April 15 - April 22.",
    available_on: 1.day.ago,
    status: "active",
    shipping_category: perishable_express_cat,
    tax_category: tax_category,
    stores: [store],
    taxons: [taxon_harvest],
    price: 2450.00
  )
  mango.save!
  mango.master.update!(sku: "SOF-MNG-ALPH-B1", weight: 4.20, track_inventory: true)
  mango.master.stock_items.find_or_create_by!(stock_location: stock_location).update!(count_on_hand: 0, backorderable: true)

  puts "==> SUCCESS: Seth Organic Farm database seeded perfectly!"
end
