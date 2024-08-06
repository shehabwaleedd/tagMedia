'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Cookies from 'js-cookie'
import useWindowWidth from '@/hooks/useWindowWidth';

interface EntityProps {
    type: string;
}

interface Entity {
    id: string;
    _id: string;
    name: string;
    description?: string;
    image: {
        url: string;
    };
    position?: string;
    link?: string;
}

const DisplayEntities: React.FC<EntityProps> = ({ type }) => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reorderedEntities, setReorderedEntities] = useState<Entity[]>([]);
    const { isMobile } = useWindowWidth()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}`);
                setEntities(response.data.data);
                setReorderedEntities(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        
        if (!isConfirmed) {
            return;
        }
    
        const token = Cookies.get("token");
        if (!token) {
            setError('Unauthorized: No token found');
            return;
        }
    
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`, {
                headers: {
                    token: token
                }
            });
            if (response.status === 200) {
                setEntities(prev => prev.filter(entity => entity._id !== id));
                setReorderedEntities(prev => prev.filter(entity => entity._id !== id));
                alert("Item deleted successfully!");
            } else {
                throw new Error("Failed to delete entity");
            }
        } catch (err) {
            setError('Failed to delete entity');
            alert("Failed to delete item. Please try again.");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination || destination.index === source.index) {
            return;
        }
        const items = Array.from(reorderedEntities);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setReorderedEntities(items);
    };

    const handleSaveOrder = async () => {
        const orderedItems = reorderedEntities.map((item, index) => ({ _id: item._id, index }));
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/order`, orderedItems, {
                headers: {
                    'Content-Type': 'application/json',
                    token: Cookies.get("token"),
                },
            });
            alert('Order saved successfully!');
            setEntities(reorderedEntities);
        } catch (err) {
            console.error('Failed to save new order:', err);
            setError('Failed to save new order');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.allEntities}>
                <div className={styles.upper}>
                    <h1>{type.charAt(0).toUpperCase() + type.slice(1) + (type === 'partner' ? 's' : '')}</h1>
                    <button onClick={handleSaveOrder} className={styles.saveButton}>Save Order</button>
                </div>
                <Droppable droppableId={`${type}-list`}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.allEntities__container}>
                            {reorderedEntities.map((entity, index) => (
                                <Draggable key={entity._id} draggableId={entity._id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.allEntities__container__card}>
                                            <div className={styles.allEntities__container__card_top}>
                                                <Image src={entity.image.url || '/placeholder.png'} alt={entity.name} className={styles.image} width={500} height={500} />
                                                {isMobile ? (<p>{entity.name.slice(0, 10)}...</p>) : (<p>{entity.name}</p>)}
                                            </div>
                                            <div className={styles.btns}>
                                                {type === 'team' && <p>{entity.position}</p>}
                                                <Link href={`/account/edit/${type}/${entity._id}`}>Edit</Link>
                                                <button style={{ backgroundColor: "#ef6363" }} onClick={() => handleDelete(entity._id)}>Delete</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default DisplayEntities;