import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt, faPhoneAlt, faEnvelopeOpenText);
const ContactList = [
  {
    key: 1,
    icon: faMapMarkerAlt,
    content: '서울시 강남구 선릉로 433 세방빌딩 6층',
  },
  { key: 2, icon: faPhoneAlt, content: '+82-10-9907-0180' },
  { key: 3, icon: faEnvelopeOpenText, content: 'team3.plant.it@gmail.com' },
];

export default ContactList;
