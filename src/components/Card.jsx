import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../fireBaseConfiq';
import { useLocation } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';

function Card() {
  const location = useLocation();
  const [data, setData] = useState(null); // Initialize data as null
  const [displayValue, setDisplayValue] = useState('');

  // useEffect to fetch data from location state
  useEffect(() => {
    if (location.state) {
      setData(location.state);
      setDisplayValue(location.state.description || ''); // Set default value for displayValue
    }
  }, [location.state]);

  // Function to update the Firestore document
  const updateDescription = async (newValue) => {
    if (!data) return; // Ensure data is not null before proceeding
    const docRef = doc(db, 'notes', data.id);
    try {
      await updateDoc(docRef, { description: newValue });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // Function to handle change in ReactQuill
  const handleChange = (newValue) => {
    setDisplayValue(newValue);
  };

  // useEffect to handle updating Firestore document when displayValue changes
  useEffect(() => {
    updateDescription(displayValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue]);

  if (!data) {
    return <div>Loading...</div>; // Handle the case where data is still being fetched
  }

  return (
    <>
      <div>
        <h2 className="mt-2">{data.title}</h2>
        <ReactQuill
          className="mt-3"
          style={{ height: '100px' }}
          placeholder="Enter details here...."
          theme="snow"
          value={displayValue}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Card;
