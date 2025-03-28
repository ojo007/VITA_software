import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import './ItemGrid.css';

const ItemGrid = ({ erp, itemDescription, itemCodeUnit, mainCategory, onAddItem }) => {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('0');
    const [disVal, setDisVal] = useState(0);
    const [disTot, setDisTot] = useState('0');
    const [vat, setVat] = useState('0');
    const [vatVal, setVatVal] = useState(0);
    const [total, setTotal] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
        if (e.target.value !== '0') {
            setDisVal('0');
        }
    };

    const handleVatChange = (e) => {
        setVat(e.target.value);
        if (e.target.value !== '0') {
            setVatVal('0');
        }
    };

    const handleDiscountValueChange = (values) => {
        const { floatValue } = values;
        setDisVal(floatValue || 0);
        if (floatValue !== 0) {
            setDiscount('0');
        }
    };

    const handleVatValueChange = (values) => {
        const { floatValue } = values;
        setVatVal(floatValue || 0);
        if (floatValue !== 0) {
            setVat('0');
        }
    };

    useEffect(() => {
        const discountPercent = parseFloat(discount) / 100;
        const calculatedDis = parseFloat(discountPercent * parseFloat(quantity) * parseFloat(price));
        const calculatedDisTot = (parseFloat(quantity) * parseFloat(price) - parseFloat(calculatedDis) - parseFloat(disVal)).toFixed(2);
        setDisTot(calculatedDisTot);

        const vatPercent = parseFloat(vat) / 100;
        const vatAmount = vatPercent * calculatedDisTot;
        const calculatedTotal = parseFloat(calculatedDisTot) + parseFloat(vatAmount) + parseFloat(vatVal);
        setTotal(calculatedTotal.toFixed(2));
    }, [quantity, price, disVal, discount, vat, vatVal]);

    useEffect(() => {
        if (erp && itemDescription && itemCodeUnit && quantity && price && total > 0) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [erp, itemDescription, itemCodeUnit, quantity, price, total]);

    const handleAddMaterialClick = (e) => {
        e.preventDefault();
        const itemData = {
            erp,
            itemDescription,
            itemCodeUnit,
            quantity,
            price,
            mainCategory,
            discount,
            disVal,
            disTot,
            vat,
            vatVal,
            total
        };
        onAddItem(itemData);
        // Clear the inputs after adding the item
        setQuantity('');
        setPrice('');
        setDiscount('0');
        setDisVal(0);
        setDisTot('0');
        setVat('0');
        setVatVal(0);
        setTotal(0);
    };

    return (
        <div>
            <div className='grid-container'>
                <div className='grid-item'>
                    <label className='erp-text'><strong>ERP Code</strong></label>
                    <input
                        type='text'
                        name='erp'
                        placeholder='ERP Code'
                        value={erp}
                        readOnly
                        required
                        className='form-control rounded-4 erp-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='itc-text'><strong>Item Code Description</strong></label>
                    <input
                        type='text'
                        name='itc'
                        placeholder='Item Code Description'
                        value={itemDescription}
                        readOnly
                        className='form-control rounded-4 item-description-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='itu-text'><strong>Main Category</strong></label>
                    <input
                        type='text'
                        name='main_category'
                        placeholder='Main Category'
                        value={mainCategory}
                        readOnly
                        className='form-control rounded-4 item-category-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='category-text'><strong>Item Code Unit</strong></label>
                    <input
                        type='text'
                        name='itu'
                        placeholder='Item Code Unit'
                        value={itemCodeUnit}
                        readOnly
                        className='form-control rounded-4 item-unit-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='qty-text'><strong>Material Quantity</strong></label>
                    <input
                        type='number'
                        name='qty'
                        placeholder='Quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min='0'
                        className='form-control rounded-4 item-qty-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='price-text'><strong>Material Price</strong></label>
                    <NumericFormat
                        value={price}
                        thousandSeparator={true}
                        onValueChange={(values) => setPrice(values.floatValue || 0)}
                        placeholder="0.00"
                        className='form-control rounded-4 item-price-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='discount-text'><strong>Discount %</strong></label>
                    <select value={discount}
                        onChange={handleDiscountChange}
                        className='form-control rounded-4 item-discount-input'
                        disabled={disVal !== '0'}
                    >
                        <option value='0'>0%</option>
                        <option value='5'>5%</option>
                        <option value='10'>10%</option>
                        <option value='15'>15%</option>
                        <option value='20'>20%</option>
                        <option value='25'>25%</option>
                        <option value='30'>30%</option>
                        <option value='35'>35%</option>
                        <option value='40'>40%</option>
                        <option value='45'>45%</option>
                        <option value='50'>50%</option>
                    </select>
                </div>
                <div className='grid-item'>
                    <label className='disVal-text'><strong>Discount Value</strong></label>
                    <NumericFormat
                        value={disVal}
                        thousandSeparator={true}
                        onValueChange={handleDiscountValueChange}
                        placeholder="0.00"
                        className='form-control rounded-4 item-disVal-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='disTot-text'><strong>Total With Discount</strong></label>
                    <NumericFormat
                        name='disTot'
                        value={disTot}
                        thousandSeparator={true}
                        placeholder='Total With Discount'
                        min='0'
                        readOnly
                        className='form-control rounded-4 item-disTot-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='vat-text'><strong>VAT %</strong></label>
                    <select value={vat}
                        onChange={handleVatChange}
                        disabled={vatVal !== '0'}
                        className='form-control rounded-4 item-vat-input'
                    >
                        <option value='0'>0%</option>
                        <option value='7.5'>7.5%</option>
                    </select>
                </div>
                <div className='grid-item'>
                    <label className='vatVal-text'><strong>VAT Value</strong></label>
                    <NumericFormat
                        value={vatVal}
                        thousandSeparator={true}
                        onValueChange={handleVatValueChange}
                        placeholder="0.00"
                        className='form-control rounded-4 item-vatVal-input'
                    />
                </div>
                <div className='grid-item'>
                    <label className='total-text'><strong>Grand Total</strong></label>
                    <NumericFormat
                        value={total}
                        thousandSeparator={true}
                        readOnly
                        placeholder="0.00"
                        className='form-control rounded-4 item-total-input'
                    />
                </div>
            </div>
            <button
                className='select-button'
                onClick={handleAddMaterialClick}
                disabled={isButtonDisabled}
            >
                Add Material For Application
            </button>
        </div>
    );
};

export default ItemGrid;
