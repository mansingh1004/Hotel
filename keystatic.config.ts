import { config, fields, collection, singleton } from "@keystatic/core";
import { BrandMark } from "@/components/keystatic/BrandMark";

/* ------------------------------------------------------------------ *
 * Shared field builders
 * ------------------------------------------------------------------ */

/** Images are stored as plain URLs (Unsplash CDN today) — see lib/images.ts. */
const urlField = (label: string) => fields.text({ label });

const urlArray = (label: string) =>
  fields.array(fields.text({ label: "Image URL" }), {
    label,
    itemLabel: (props) => props.value || "Image URL",
  });

const textArray = (label: string, itemLabel = "Item") =>
  fields.array(fields.text({ label: itemLabel }), {
    label,
    itemLabel: (props) => props.value || itemLabel,
  });

/** Order field lets editors control display order without renaming files. */
const orderField = fields.number({
  label: "Display order",
  description: "Lower numbers appear first.",
  validation: { isRequired: true },
  defaultValue: 100,
});

const AMENITY_OPTIONS = [
  { label: "Free WiFi", value: "wifi" },
  { label: "Swimming Pool", value: "pool" },
  { label: "Spa & Wellness", value: "spa" },
  { label: "Fitness Center", value: "gym" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Bar & Lounge", value: "bar" },
  { label: "Valet Parking", value: "parking" },
  { label: "Airport Pickup", value: "airport" },
  { label: "24/7 Concierge", value: "concierge" },
  { label: "Private Beach", value: "beach" },
  { label: "Pet Friendly", value: "petFriendly" },
  { label: "Room Service", value: "roomService" },
  { label: "Business Center", value: "businessCenter" },
  { label: "Air Conditioning", value: "airConditioning" },
] as const;

const ROOM_TYPE_OPTIONS = [
  { label: "Deluxe", value: "Deluxe" },
  { label: "Suite", value: "Suite" },
  { label: "Executive", value: "Executive" },
  { label: "Presidential", value: "Presidential" },
  { label: "Villa", value: "Villa" },
  { label: "Standard", value: "Standard" },
] as const;

/* ------------------------------------------------------------------ *
 * Keystatic configuration
 * ------------------------------------------------------------------ */

export default config({
  // Local mode writes to the filesystem — great for `npm run dev`, but it
  // CANNOT work on Vercel (read-only, ephemeral serverless FS), which is why
  // the deployed dashboard shows no data and saving returns 500. In production
  // we use GitHub storage: reads/writes go through the GitHub API, and each
  // edit commits to the repo (triggering a Vercel redeploy).
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "github", repo: "mansingh1004/Hotel" },
  ui: {
    brand: { name: "Luxvoy CMS", mark: BrandMark },
    navigation: {
      Properties: ["hotels", "destinations"],
      Marketing: ["offers", "testimonials", "services"],
      Content: ["gallery", "faqs", "team", "about"],
    },
  },
  collections: {
    hotels: collection({
      label: "Hotels",
      slugField: "name",
      path: "content/hotels/*",
      format: { data: "json" },
      previewUrl: "/hotels/{slug}",
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: { label: "Hotel name", validation: { isRequired: true } },
          slug: {
            label: "Slug (URL)",
            description: "Used in the hotel page URL — /hotels/{slug}.",
          },
        }),
        order: orderField,
        tagline: fields.text({
          label: "Tagline",
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: "Category",
          description: "e.g. Beach Resort, City Palace, Boutique Retreat.",
          validation: { isRequired: true },
        }),
        city: fields.text({ label: "City", validation: { isRequired: true } }),
        country: fields.text({
          label: "Country",
          validation: { isRequired: true },
        }),
        coordinates: fields.object(
          {
            lat: fields.number({ label: "Latitude" }),
            lng: fields.number({ label: "Longitude" }),
          },
          { label: "Map coordinates" }
        ),
        rating: fields.number({
          label: "Rating",
          description: "Average guest rating, e.g. 4.9.",
        }),
        reviewsCount: fields.number({ label: "Reviews count" }),
        pricePerNight: fields.number({ label: "Price per night" }),
        currency: fields.text({ label: "Currency", defaultValue: "INR" }),
        starRating: fields.select({
          label: "Star rating",
          options: [
            { label: "3 stars", value: "3" },
            { label: "4 stars", value: "4" },
            { label: "5 stars", value: "5" },
          ],
          defaultValue: "5",
        }),
        featured: fields.checkbox({
          label: "Featured on homepage",
          defaultValue: false,
        }),
        description: fields.text({
          label: "Short description",
          multiline: true,
          validation: { isRequired: true },
        }),
        longDescription: fields.text({
          label: "Long description",
          multiline: true,
          validation: { isRequired: true },
        }),
        amenities: fields.multiselect({
          label: "Amenities",
          options: [...AMENITY_OPTIONS],
        }),
        images: urlArray("Gallery images"),
        rooms: fields.array(
          fields.object({
            name: fields.text({
              label: "Room name",
              validation: { isRequired: true },
            }),
            type: fields.select({
              label: "Type",
              options: [...ROOM_TYPE_OPTIONS],
              defaultValue: "Deluxe",
            }),
            price: fields.number({
              label: "Price per night",
              validation: { isRequired: true },
            }),
            size: fields.number({
              label: "Size (m²)",
              validation: { isRequired: true },
            }),
            capacity: fields.number({
              label: "Capacity (guests)",
              validation: { isRequired: true },
            }),
            beds: fields.text({
              label: "Beds",
              validation: { isRequired: true },
            }),
            image: fields.text({
              label: "Main image URL",
              validation: { isRequired: true },
            }),
            gallery: urlArray("Room gallery"),
            features: textArray("Features", "Feature"),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Rooms", itemLabel: (props) => props.fields.name.value || "Room" }
        ),
        reviews: fields.array(
          fields.object({
            author: fields.text({
              label: "Author",
              validation: { isRequired: true },
            }),
            avatar: fields.text({
              label: "Avatar URL",
              validation: { isRequired: true },
            }),
            rating: fields.number({
              label: "Rating (1–5)",
              validation: { isRequired: true, min: 1, max: 5 },
            }),
            date: fields.date({
              label: "Date",
              validation: { isRequired: true },
            }),
            title: fields.text({
              label: "Title",
              validation: { isRequired: true },
            }),
            body: fields.text({
              label: "Body",
              multiline: true,
              validation: { isRequired: true },
            }),
            country: fields.text({
              label: "Country",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Reviews",
            itemLabel: (props) => props.fields.author.value || "Review",
          }
        ),
      },
    }),

    destinations: collection({
      label: "Destinations",
      slugField: "name",
      path: "content/destinations/*",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "Destination name" } }),
        order: orderField,
        country: fields.text({ label: "Country" }),
        image: urlField("Image URL"),
        hotelsCount: fields.number({ label: "Hotels count" }),
        fromPrice: fields.number({ label: "From price" }),
      },
    }),

    offers: collection({
      label: "Offers",
      slugField: "title",
      path: "content/offers/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Offer title" } }),
        order: orderField,
        description: fields.text({ label: "Description", multiline: true }),
        discount: fields.text({ label: "Discount label" }),
        image: urlField("Image URL"),
        code: fields.text({ label: "Promo code" }),
        validUntil: fields.date({ label: "Valid until" }),
        badge: fields.text({ label: "Badge" }),
      },
    }),

    testimonials: collection({
      label: "Testimonials",
      slugField: "name",
      path: "content/testimonials/*",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "Person name" } }),
        order: orderField,
        role: fields.text({ label: "Role" }),
        avatar: urlField("Avatar URL"),
        rating: fields.number({ label: "Rating" }),
        quote: fields.text({ label: "Quote", multiline: true }),
        location: fields.text({ label: "Location" }),
      },
    }),

    services: collection({
      label: "Services",
      slugField: "title",
      path: "content/services/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Service title" } }),
        order: orderField,
        description: fields.text({ label: "Description", multiline: true }),
        icon: fields.text({
          label: "Icon key",
          description: "Matches a key in lib/amenities/services icon map.",
        }),
        image: urlField("Image URL"),
        features: textArray("Features", "Feature"),
      },
    }),

    team: collection({
      label: "Team",
      slugField: "name",
      path: "content/team/*",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "Member name" } }),
        order: orderField,
        role: fields.text({ label: "Role" }),
        image: urlField("Image URL"),
        bio: fields.text({ label: "Bio", multiline: true }),
      },
    }),

    gallery: collection({
      label: "Gallery",
      slugField: "title",
      path: "content/gallery/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({
          name: { label: "Image title", validation: { isRequired: true } },
        }),
        order: orderField,
        src: fields.text({
          label: "Image URL",
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: "Category",
          validation: { isRequired: true },
        }),
        span: fields.select({
          label: "Grid span",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Tall", value: "tall" },
            { label: "Wide", value: "wide" },
          ],
          defaultValue: "normal",
        }),
      },
    }),

    faqs: collection({
      label: "FAQs",
      slugField: "question",
      path: "content/faqs/*",
      format: { data: "json" },
      columns: ["question", "order"],
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        order: orderField,
        category: fields.text({ label: "Category" }),
        answer: fields.text({ label: "Answer", multiline: true }),
      },
    }),
  },

  singletons: {
    about: singleton({
      label: "About page",
      path: "content/about",
      format: { data: "json" },
      schema: {
        stats: fields.array(
          fields.object({
            value: fields.number({ label: "Value" }),
            suffix: fields.text({ label: "Suffix" }),
            label: fields.text({ label: "Label" }),
          }),
          {
            label: "Stats",
            itemLabel: (props) => props.fields.label.value || "Stat",
          }
        ),
        awards: fields.array(
          fields.object({
            year: fields.text({ label: "Year" }),
            title: fields.text({ label: "Title" }),
            org: fields.text({ label: "Organisation" }),
          }),
          {
            label: "Awards",
            itemLabel: (props) => props.fields.title.value || "Award",
          }
        ),
      },
    }),
  },
});
