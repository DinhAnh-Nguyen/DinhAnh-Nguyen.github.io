// Site-wide settings.

export const SITE = 'https://daniel-nguyen.dev';

// Contact form: messages are sent through Web3Forms (web3forms.com), which
// forwards them to the owner's inbox. The access key is designed to be public
// (it is visible in any page that uses it) and only lets people send mail to
// that one inbox. Get one free at https://web3forms.com, then paste it here. In the Web3Forms
// dashboard, also restrict the key to daniel-nguyen.dev so it cannot be used elsewhere.
export const WEB3FORMS_ACCESS_KEY = '79a95258-e3e0-4269-9266-d2480a348d1d';

// The form only switches on for a well-formed key (a UUID), so an empty or mistyped value shows the
// "being set up" notice instead of a form that silently fails.
export const FORM_READY = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(WEB3FORMS_ACCESS_KEY);
