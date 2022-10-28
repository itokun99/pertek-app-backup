const API_BASE_URL = process.env.API_BASE_URL;

export const SendGridAPIKey = process.env.SENDGRID_API_KEY;

const EndpointGroup = {
  Announcement: '18S1unQy',
  Helpdesk: '',
  Auth: 'xG61OBxf',
  Profile: '4ZHQKRkr',
  Tenant: 'AyPV9ZMZ',
  Invoice: 'KM9qpTln',
  Property: 'dhVjwBnw',
  Role: 'vMBtbFQW',
  User: 'f_KrKkJn',
  General: 'aQbHTGQV',
  Complain: 'Ro92vKeQ',
  Facility: 'JBGyX9le',
  Booking: '4oTf-klT',
  Menu: '2ENXJrQ4',
};

export const Endpoint = {
  Announcement: `${API_BASE_URL}:${EndpointGroup.Announcement}/announcement`,
  Login: `${API_BASE_URL}:${EndpointGroup.Auth}/auth/login`,
  Me: `${API_BASE_URL}:${EndpointGroup.Auth}/auth/me`,

  Helpdesk: `${API_BASE_URL}:${EndpointGroup.Helpdesk}/helpdesk`,

  Complain: `${API_BASE_URL}:${EndpointGroup.Complain}/complain`,
  ComplainCategory: `${API_BASE_URL}:${EndpointGroup.Complain}/complain_category`,
  ComplainState: `${API_BASE_URL}:${EndpointGroup.Complain}/complain_state`,

  NumberSequence: `${API_BASE_URL}:${EndpointGroup.General}/number_sequence`,
  TemplateObject: `${API_BASE_URL}:${EndpointGroup.General}/template_object`,
  UtilityUsage: `${API_BASE_URL}:${EndpointGroup.General}/utility_usage`,

  Invoice: `${API_BASE_URL}:${EndpointGroup.Invoice}/invoice`,
  InvoicePayment: `${API_BASE_URL}:${EndpointGroup.Invoice}/invoice_payment`,
  InvoiceTemplate: `${API_BASE_URL}:${EndpointGroup.Invoice}/template_invoice`,

  Profile: `${API_BASE_URL}:${EndpointGroup.Profile}/profile`,

  Property: `${API_BASE_URL}:${EndpointGroup.Property}/property`,
  PropertyUnitType: `${API_BASE_URL}:${EndpointGroup.Property}/property_unit_type`,

  Role: `${API_BASE_URL}:${EndpointGroup.Role}/role`,
  RoleGroup: `${API_BASE_URL}:${EndpointGroup.Role}/role_group`,

  Facility: `${API_BASE_URL}:${EndpointGroup.Facility}/facility`,
  FacilityAssistant: `${API_BASE_URL}:${EndpointGroup.Facility}/facility_assistant`,
  FacilityCategory: `${API_BASE_URL}:${EndpointGroup.Facility}/facility_category`,
  FacilityVenue: `${API_BASE_URL}:${EndpointGroup.Facility}/facility_venue`,

  Booking: `${API_BASE_URL}:${EndpointGroup.Booking}/facility_booking`,
  BookingStats: `${API_BASE_URL}:${EndpointGroup.Booking}/facility_booking_stats`,

  Menu: `${API_BASE_URL}:${EndpointGroup.Menu}/menu`,
  MenuMe: `${API_BASE_URL}:${EndpointGroup.Menu}/menu_me`,
  MenuGroup: `${API_BASE_URL}:${EndpointGroup.Menu}/menu_group`,

  User: `${API_BASE_URL}:${EndpointGroup.User}/user`,

  Tenant: `${API_BASE_URL}:${EndpointGroup.Tenant}/tenant`,

  // Klaster
  Klaster: `${API_BASE_URL}:${EndpointGroup.Property}/property_cluster`,

  // Unit
  Unit: `${API_BASE_URL}:${EndpointGroup.Property}/property_unit`,
  UnitType: `${API_BASE_URL}:${EndpointGroup.Property}/property_unit_type`,

  // Contacts
  Contact: `${API_BASE_URL}:${EndpointGroup.Profile}/contact`,
  ContactPhone: `${API_BASE_URL}:${EndpointGroup.Profile}/contact_phone_number`,
  ContactEmail: `${API_BASE_URL}:${EndpointGroup.Profile}/contact_email`,
};
