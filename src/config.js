// Site-wide settings.

export const SITE = 'https://dinhanh-nguyen.github.io';

// Contact form: messages are sent through Web3Forms (web3forms.com), which
// forwards them to the owner's inbox. The access key is designed to be public
// (it is visible in any page that uses it) and only lets people send mail to
// that one inbox. Get one free at https://web3forms.com, then paste it here.
export const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

export const FORM_READY = !WEB3FORMS_ACCESS_KEY.startsWith('REPLACE');
