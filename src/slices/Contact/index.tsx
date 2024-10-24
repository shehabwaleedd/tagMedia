import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactUpper from "@/components/contactUpper";
import ContactForm from "@/components/contactForm";
import styles from "./page.module.scss";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.contact}>
      <ContactUpper iFrameLink={slice.primary.iframelink} address={slice.primary.address} phone={slice.primary.phone_number} />
      <ContactForm />
    </section>
  );
};

export default Contact;
