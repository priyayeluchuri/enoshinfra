import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import the WhatsApp icon
import styles from '../styles/WhatsAppbutton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = '+918073582033';
  const message = encodeURIComponent("I'm interested in your property services");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
  const { t } = useTranslation('common');
  return (
    <div className={styles.whatsappContainer}>
      <Link href={whatsappLink} passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
          <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} />
          {t('whatsapp.cta')}
        </a>
      </Link>
    </div>
  );
};

export default WhatsAppButton;

