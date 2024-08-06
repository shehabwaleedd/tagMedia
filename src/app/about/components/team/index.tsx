import React from 'react'
import styles from "./style.module.scss"
import Image from 'next/image';

type TeamProps = {
    name: string;
    position: string;
    image: {
        url: string;
    };
};
const Team = ({ team }: { team: TeamProps[] }) => {

    return (
        <section className={styles.team}>
            <h3> Team </h3>
            <div className={styles.teamContainer}>
                {team.map((member: TeamProps, index: number) => (
                    <div key={index} className={styles.member}>
                        <div className={styles.image}>
                            <Image src={member.image?.url} alt={member.name} width={500} height={500}/>
                        </div>
                        <div className={styles.text}>
                            <h4>{member.name}</h4>
                            <p>{member.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Team
