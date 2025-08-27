
import React from 'react';
import { Modal } from 'react-bootstrap';

const Chainmodel = ({ show, handleClose, handleSelectChain }) => {
    const chains = [
        { id: 1, image: 'logo/eth.png', text: 'Ethereum' },
        { id: 2, image: 'logo/polygon.png', text: 'Polygon' },
        { id: 3, image: 'logo/bnb.png', text: 'BSC' },
        { id: 4, image: 'logo/arb.png', text: 'Arbitrum' },
        { id: 5, image: 'logo/base.png', text: 'Base' },
        { id: 6, image: 'logo/op.png', text: 'Optimism' },
        { id: 7, image: 'logo/zk.png', text: 'ZKSync' },
        { id: 8, image: 'logo/avax.png', text: 'Avalanche' },
    ];

    return (
        <Modal centered show={show} onHide={handleClose} animation={true}>
        <Modal.Header className="border-2 flex justify-between bgb text-white">
            <Modal.Title>Select Chain</Modal.Title>
            <button className="text-2xl w-10 font-semibold" onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body className="border-2 p-0">
            <div className="h-52 overflow-auto">
                <ul>
                    {chains.map((chain) => (
                        <li
                            key={chain.id}
                            className="text-white pl-3 py-2 bgb cursor-pointer"
                            onClick={() => {
                                console.log(`Selected Chain: ${chain.text}`);
                                handleSelectChain(chain);
                            }}
                        >
                            <div className="flex items-center">
                                <img src={chain.image} alt={chain.text} className="w-10 h-10 mr-2" />
                                <p>{chain.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal.Body>
    </Modal>

    );
};

export default Chainmodel;
