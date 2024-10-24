import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from './style.module.scss';

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

type Service = {
  category_name: string;
  services_items: {
    service_item: string;
  }[];
};

const hardcodedService = {
  category_name: "End-to-end",
  services_items: [{ service_item: 'Creative execution' }]
};

const Services = ({ slice }: ServicesProps): JSX.Element => {
  const allServices = [hardcodedService, ...slice.primary.services_list];
  
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.servicesContainer}>
      <div>
        <h3>{slice.primary.title}</h3>
      </div>
      <div className={styles.servicesList}>
        {allServices.map((service, index) => (
          index === 0 ? (
            <div key={index} className={styles.specialCard}>
              <h3>{service.category_name}</h3>
              <p>{service.services_items[0]?.service_item}</p>
            </div>
          ) : (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <h3>{service.category_name}</h3>
              </div>
              <ul>
                {service.services_items.map((item, idx) => (
                  <li key={idx}>{item.service_item}</li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default Services;