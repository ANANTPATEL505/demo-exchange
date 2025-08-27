import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { PriceContext } from '../data'; // Adjust the import path accordingly

const TokenModal2 = ({ show, handleClose, handleSelectToken2 }) => {
    const { cryptoData } = useContext(PriceContext); // Use context to get crypto data

    return (
        <Modal centered show={show} onHide={handleClose} animation={true}>
            <Modal.Header className="border-2 flex justify-between bgb text-white">
                <Modal.Title>Select Token</Modal.Title>
                <button className="text-2xl w-10 font-semibold" onClick={handleClose}>X</button>
            </Modal.Header>
            <Modal.Body className="border-2 p-0">
                <div className="h-52 overflow-auto">
                    <ul>
                        {cryptoData.map((token) => (
                            <li
                                key={token.id}
                                className="text-white pl-3 py-2 bgb cursor-pointer"
                                onClick={() => handleSelectToken2(token)}
                            >
                                <div className="flex items-center">
                                <img className="h-8 w-8" src={token.image}/>
                                    <p>{token.name.toUpperCase()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default TokenModal2;
