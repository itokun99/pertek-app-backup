const API_BASE_URL = "https://xmbi-4bje-h8wi.s2.xano.io/api";

const EndpointGroup = {
  Announcement: "18S1unQy",
  Auth: "xG61OBxf",
  Profile: "4ZHQKRkr",
  Tenant: "AyPV9ZMZ",
  Invoice: "KM9qpTln",
  Property: "dhVjwBnw",
  Role: "vMBtbFQW",
  User: "f_KrKkJn",
  General: "aQbHTGQV",
  Complain: "Ro92vKeQ",
  Facility: "JBGyX9le",
  Menu: "2ENXJrQ4",
};

export const Endpoint = {
  Announcement: `${API_BASE_URL}:${EndpointGroup.Announcement}/announcement`,
  Login: `${API_BASE_URL}:${EndpointGroup.Auth}/auth/login`,
  Me: `${API_BASE_URL}:${EndpointGroup.Auth}/auth/me`,

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
  FacilityBooking: `${API_BASE_URL}:${EndpointGroup.Facility}/facility_booking`,

  Menu: `${API_BASE_URL}:${EndpointGroup.Menu}/menu`,
  MenuMe: `${API_BASE_URL}:${EndpointGroup.Menu}/menu_me`,
  MenuGroup: `${API_BASE_URL}:${EndpointGroup.Menu}/menu_group`,

  User: `${API_BASE_URL}:${EndpointGroup.User}/user`,

  Tenant: `${API_BASE_URL}:${EndpointGroup.Tenant}/tenant`,
};
