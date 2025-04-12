import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactUpper from "@/components/contactUpper";
import ContactForm from "@/components/contactForm";
import styles from "./page.module.scss";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.contact}>
      <header className={styles.header}>
        {slice.primary.title && <h1 className={styles.sectionTitle}>{slice.primary.title}</h1>}
        {slice.primary.description && <p className={styles.sectionText}>{slice.primary.description}</p>}
      </header>
      <div className={styles.wrapper}>
        <ContactUpper iFrameLink={slice.primary.iframelink} address={slice.primary.address} phone={slice.primary.phone_number} />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
