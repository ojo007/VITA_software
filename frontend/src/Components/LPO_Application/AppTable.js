import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';
import vitaImage from './vita.jpg';
import './AppTable.css';

const currencySymbols = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const AppTable = ({ items, setItems }) => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [currency, setCurrency] = useState('NGN');
  const [paymentTerm, setPaymentTerm] = useState('');

  const [mainDate, setMainDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('MD');
  const [reqNo, setReqNo] = useState('');
  const [subject, setSubject] = useState('');
  const [site, setSite] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryPeriod, setDeliveryPeriod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [advancedPayment, setAdvancedPayment] = useState('');
  const [budgetedRate, setBudgetedRate] = useState('');
  const [budgetedQuantity, setBudgetedQuantity] = useState('');
  const [projectQuantity, setProjectQuantity] = useState('');
  const [balanceQuantity, setBalanceQuantity] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [initiatedBy, setInitiatedBy] = useState('');
  const [signHere, setSignHere] = useState('');
  const [initiatedDate, setInitiatedDate] = useState('');

  const handleKeyUpEvent = (event) => {
    if (event.target.classList.contains('extendable-input')) {
      const inputElement = event.target;
      const inputValue = inputElement.value;
      const minWidth = 4;

      if (inputValue.length === 0) {
        inputElement.style.width = `${minWidth}ch`;
      } else {
        const inputWidth = inputValue.length + 10;
        inputElement.style.width = `${inputWidth}ch`;
      }
    }
  };

  useEffect(() => {
    const totalItems = items.reduce((sum, item) => sum + parseFloat(item.total), 0);
    const total = totalItems + parseFloat(transportation);
    setGrandTotal(total.toFixed(2));
  }, [items, transportation]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUpEvent);
    return () => {
      document.removeEventListener('keyup', handleKeyUpEvent);
    };
  }, []);

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleTransportationChange = (values) => {
    const { floatValue } = values;
    setTransportation(floatValue || 0);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handlePaymentTermChange = (e) => {
    setPaymentTerm(e.target.value);
  };

  const splitItemsIntoPages = (items, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      pages.push(items.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const pages = splitItemsIntoPages(items, 10);

  const calculatePageTotal = (page, includeTransportation = false) => {
    const pageTotal = page.reduce((sum, item) => sum + parseFloat(item.total), 0);
    return includeTransportation ? pageTotal + parseFloat(transportation) : pageTotal;
  };

  const renderHeader = (pageIndex) => (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          <img src={vitaImage} alt="Vita" />
        </div>
        <div className="header-center">
          <h5><strong>APPLICATION FOR SUPPLIER LPO</strong></h5>
        </div>
        <div className="header-right">
          <label htmlFor={`application-date-${pageIndex}`}><strong>Date:</strong></label>
          <input
            type="date"
            id={`application-date-${pageIndex}`}
            className="uppercase"
            value={mainDate}
            onChange={(e) => setMainDate(e.target.value)}
          />
        </div>
      </div>

      <div className="border-line"></div>

      <div className="header-bottom">
        <p>
          <strong>From:</strong>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="dynamic-width uppercase extendable-input"
          />
        </p>
        <p>
          <strong>To:</strong>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="MD">MD</option>
            <option value="CD">CD</option>
            <option value="MD/CD">MD/CD</option>
          </select>
        </p>
        <p>
          <strong>Req No:</strong>
          <input
            value={reqNo}
            onChange={(e) => setReqNo(e.target.value)}
            className="req-no-input"
          />
        </p>
      </div>

      <div className="header-bottom-second">
        <p>
          <strong>Subject:</strong>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="dynamic-width uppercase extendable-input"
          />
        </p>
        <p>
          <strong>Site:</strong>
          <input
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="dynamic-width uppercase extendable-input"
          />
        </p>
      </div>

      <div className="border-line"></div>

      <div className="service-section">
        <div>
          <label><strong>Service of the provider (Select one):</strong></label>
        </div>
        <div className="service-options">
          <label>
            <input type="radio" name={`serviceType-${pageIndex}`} value="Supplier" defaultChecked />
            Supplier (Direct Purchases)
          </label>
          <label>
            <input type="radio" name={`serviceType-${pageIndex}`} value="Asset" />
            Asset & Plant Equipment
          </label>
          <label>
            <input type="radio" name={`serviceType-${pageIndex}`} value="Client" />
            Client Asset & Materials
          </label>
        </div>
      </div>

      <div className="border-line"></div>

      <div className="order-section">
        <div>
          <label><strong>Type of the Purchase order (Select one):</strong></label>
        </div>
        <div className="order-options">
          <label>
            <input type="radio" name={`orderType-${pageIndex}`} value="Local" defaultChecked />
            Local Purchase Order
          </label>
          <label>
            <input type="radio" name={`orderType-${pageIndex}`} value="Overseas" />
            Overseas Purchase Order
          </label>
        </div>
      </div>

      <div className="border-line"></div>

      <div className="approval-section">
        <p>
          <strong>Your Approval is Needed to Issue LPO for the (IN CAPITALS)</strong>
          <input
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="dynamic-width uppercase extendable-input"
          />
        </p>
        <p>
          <strong>Notes</strong>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="dynamic-width uppercase extendable-input"
          />
        </p>
      </div>

      <div className="border-line"></div>
    </div>
  );

  const renderFooter = (pageIndex) => (
    <div className="footer">
      <div className="remarks-payment-container">
        <div className="remarks-wrapper">
          <div className="remarks-select-container" style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '-10px' }}><strong>Remarks & Payment Terms</strong></label>
            <select className="remarks-select dynamic-width" onChange={handlePaymentTermChange} value={paymentTerm}>
              <option value="">Select Payment Term</option>
              <option value="advanced_payment">Advanced Payment</option>
              <option value="payment_before_delivery">Payment Before Delivery</option>
            </select>
            {paymentTerm === 'advanced_payment' && (
              <div className="remarks-selection">
                <label style={{ marginLeft: '50px' }}><strong>Advanced Payment Details</strong></label>
                <input
                  className="dynamic-width uppercase extendable-input remarks-input"
                  value={advancedPayment}
                  onChange={(e) => setAdvancedPayment(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-line"></div>

      <div className="delivery-section">
        <label htmlFor={`delivery-period-${pageIndex}`}><strong>Delivery Period:</strong></label>
        <input
          type="date"
          id={`delivery-period-${pageIndex}`}
          value={deliveryPeriod}
          onChange={(e) => setDeliveryPeriod(e.target.value)}
          className="uppercase"
        />
      </div>

      <div className="border-line"></div>

      <div className="account-info">
        <div className="account-input-group">
          <label><strong>Account Number</strong></label>
          <input
            type='number'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="dynamic-width uppercase extendable-input account-input"
          />
        </div>

        <div className="account-input-group">
          <label><strong>Account Name</strong></label>
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="dynamic-width uppercase extendable-input account-input"
          />
        </div>

        <div className="account-input-group">
          <label><strong>Bank Name</strong></label>
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="dynamic-width uppercase extendable-input account-input"
          />
        </div>
      </div>

      <div className="border-line"></div>

      <div>
        <div className="inline-inputs">
          <div className="inline-input">
            <label htmlFor={`budgeted-rate-${pageIndex}`}><strong>Allowable budgeted rate</strong></label>
            <NumericFormat
              id={`budgeted-rate-${pageIndex}`}
              thousandSeparator={true}
              prefix={currencySymbols[currency]}
              onValueChange={(values) => console.log(values)}
              placeholder="0.00"
              className="dynamic-width uppercase extendable-input"
              onKeyUp={handleKeyUpEvent}
              value={budgetedRate}
              onChange={(e) => setBudgetedRate(e.target.value)}
            />
          </div>

          <div className="inline-input">
            <label htmlFor={`project-budgeted-quantity-${pageIndex}`}><strong>Project budgeted quantity</strong></label>
            <NumericFormat
              id={`project-budgeted-quantity-${pageIndex}`}
              thousandSeparator={true}
              prefix={currencySymbols[currency]}
              onValueChange={(values) => console.log(values)}
              placeholder="0.00"
              className="dynamic-width uppercase extendable-input"
              onKeyUp={handleKeyUpEvent}
              value={budgetedQuantity}
              onChange={(e) => setBudgetedQuantity(e.target.value)}
            />
          </div>

          <div className="inline-input">
            <label htmlFor={`project-quantity-consumed-${pageIndex}`}><strong>Project quantity consumed to date</strong></label>
            <NumericFormat
              id={`project-quantity-consumed-${pageIndex}`}
              thousandSeparator={true}
              prefix={currencySymbols[currency]}
              onValueChange={(values) => console.log(values)}
              placeholder="0.00"
              className="dynamic-width uppercase extendable-input"
              onKeyUp={handleKeyUpEvent}
              value={projectQuantity}
              onChange={(e) => setProjectQuantity(e.target.value)}
            />
          </div>

          <div className="inline-input">
            <label htmlFor={`balance-quantity-${pageIndex}`}><strong>Balance quantity available</strong></label>
            <NumericFormat
              id={`balance-quantity-${pageIndex}`}
              thousandSeparator={true}
              prefix={currencySymbols[currency]}
              onValueChange={(values) => console.log(values)}
              placeholder="0.00"
              className="dynamic-width uppercase extendable-input"
              onKeyUp={handleKeyUpEvent}
              value={balanceQuantity}
              onChange={(e) => setBalanceQuantity(e.target.value)}
            />
          </div>

          <div className="border-line"></div>

          <div className="additional-comments-section">
            <div>
              <label htmlFor={`additional-comments-${pageIndex}`}><strong>Additional Comments</strong></label>
              <input
                id={`additional-comments-${pageIndex}`}
                className="dynamic-width uppercase extendable-input"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-line"></div>

      <div className="approval-section">
        <div className="approval-group">
          <p>
            <strong>Initiated by:</strong>
            <input
              className="dynamic-width uppercase extendable-input"
              value={initiatedBy}
              onChange={(e) => setInitiatedBy(e.target.value)}
            />
          </p>
          <p>
            <strong>Sign Here:</strong>
            <input
              className="dynamic-width uppercase extendable-input"
              value={signHere}
              onChange={(e) => setSignHere(e.target.value)}
            />
          </p>
          <p>Date:
            <input
              type="date"
              className="uppercase"
              value={initiatedDate}
              onChange={(e) => setInitiatedDate(e.target.value)}
            />
          </p>
        </div>

        <div className="approval-group">
          <p><strong>Approved by CD/PMR:</strong></p>
          <p>Sign Here: <input type="text" className="dynamic-width uppercase extendable-input" /></p>
          <p>Date: <input type="" className="dynamic-width uppercase extendable-input" /></p>
        </div>

        <div className="approval-group">
          <p><strong>Authorized by MD:</strong></p>
          <p>Sign Here: <input type="text" className="dynamic-width uppercase extendable-input" /></p>
          <p>Date: <input type="" className="dynamic-width uppercase extendable-input" /></p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container1 normal-view">
        <div className="a4-container">
          {renderHeader(0)}
          <div className="main">
            <h3>Application Content</h3>
            <div className="currency-selection">
              <label><strong>Select Currency: </strong></label>
              <select value={currency} onChange={handleCurrencyChange}>
                <option value="NGN">Naira (NGN)</option>
                <option value="USD">Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>

            <div className='item-table-container'>
              <table className="item-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>ERP Code</th>
                    <th className="item-description">Item Code Description</th>
                    <th>Category</th>
                    <th>UOM</th>
                    <th>QTY</th>
                    <th>Price</th>
                    <th>Discount %</th>
                    <th>Discount Value</th>
                    <th>Total With Discount</th>
                    <th>VAT %</th>
                    <th>VAT Value</th>
                    <th className="total-with-vat">Total With VAT</th>
                    <th className='action'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} style={{ counterIncrement: 'row-counter' }}>
                      <td>{index + 1}</td>
                      <td>{item.erp}</td>
                      <td className="item-description">{item.itemDescription}</td>
                      <td>{item.mainCategory}</td>
                      <td>{item.itemCodeUnit}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <NumericFormat
                          value={item.price}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={item.discount}
                          thousandSeparator={true}
                          suffix={'%'}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={item.disVal}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={item.disTot}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={item.vat}
                          thousandSeparator={true}
                          suffix={'%'}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={item.vatVal}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td className="total-with-vat">
                        <NumericFormat
                          value={item.total}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </td>
                      <td>
                        <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="trans" colSpan="12" style={{ textAlign: 'right' }}>
                      <strong>Transportation & Services</strong>
                    </td>
                    <td className="trans" colSpan="2">
                      <NumericFormat
                        value={transportation}
                        thousandSeparator={true}
                        prefix={currencySymbols[currency]}
                        onValueChange={handleTransportationChange}
                        placeholder="0.00"
                        className="dynamic-width"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="grandtot" colSpan="12" style={{ textAlign: 'right' }}>
                      <strong>Grand Total</strong></td>
                    <td className="grandtot" colSpan="2">
                      <strong>
                        <NumericFormat
                          value={grandTotal}
                          thousandSeparator={true}
                          prefix={currencySymbols[currency]}
                          displayType={'text'}
                          renderText={(value) => <div>{value}</div>}
                        />
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {renderFooter(0)}
        </div>
      </div>

      <div className="container1 print-view">
        {pages.map((page, pageIndex) => {
          const pageTotal = calculatePageTotal(page, pageIndex === 0);
          const previousPagesTotal = pages.slice(0, pageIndex).reduce((sum, pg, idx) => sum + calculatePageTotal(pg, idx === 0), 0);
          const cumulativeTotal = previousPagesTotal + pageTotal;

          return (
            <div key={pageIndex} className={`a4-container page-break ${pageIndex > 0 ? 'second-page-table' : ''}`}>
              {renderHeader(pageIndex)}
              <div className="main">
                {pageIndex === 0 && (
                  <h3>Application Content</h3>
                )}
                <div className="currency-selection">
                  <label><strong>Select Currency: </strong></label>
                  <select value={currency} onChange={handleCurrencyChange}>
                    <option value="NGN">Naira (NGN)</option>
                    <option value="USD">Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>

                <div className='item-table-container'>
                  <table className="item-table">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>ERP Code</th>
                        <th className="item-description">Item Code Description</th>
                        <th>Category</th>
                        <th>UOM</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Discount %</th>
                        <th>Discount Value</th>
                        <th>Total With Discount</th>
                        <th>VAT %</th>
                        <th>VAT Value</th>
                        <th className="total-with-vat">Total With VAT</th>
                        <th className='action'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.map((item, index) => (
                        <tr key={index} style={{ counterIncrement: 'row-counter' }}>
                          <td>{pageIndex * 10 + index + 1}</td>
                          <td>{item.erp}</td>
                          <td className="item-description">{item.itemDescription}</td>
                          <td>{item.mainCategory}</td>
                          <td>{item.itemCodeUnit}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <NumericFormat
                              value={item.price}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              value={item.discount}
                              thousandSeparator={true}
                              suffix={'%'}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              value={item.disVal}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              value={item.disTot}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              value={item.vat}
                              thousandSeparator={true}
                              suffix={'%'}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              value={item.vatVal}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td className="total-with-vat">
                            <NumericFormat
                              value={item.total}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </td>
                          <td>
                            <button className="remove-button" onClick={() => handleRemoveItem(pageIndex * 6 + index)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="trans" colSpan="12" style={{ textAlign: 'right' }}>
                          <strong>Transportation & Services</strong>
                        </td>
                        <td className="trans" colSpan="2">
                          <NumericFormat
                            value={transportation}
                            thousandSeparator={true}
                            prefix={currencySymbols[currency]}
                            onValueChange={handleTransportationChange}
                            placeholder="0.00"
                            className="dynamic-width"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="grandtot" colSpan="12" style={{ textAlign: 'right' }}>
                          <strong>Grand Total</strong></td>
                        <td className="grandtot" colSpan="2">
                          <strong>
                            <NumericFormat
                              value={cumulativeTotal.toFixed(2)}
                              thousandSeparator={true}
                              prefix={currencySymbols[currency]}
                              displayType={'text'}
                              renderText={(value) => <div>{value}</div>}
                            />
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {renderFooter(pageIndex)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AppTable;
