import React from "react";
import '../Payment/Payment.css'
import { useLocation } from "react-router-dom";

export default function CustomerBookingDetail() {

    const location = useLocation();
    // const { projectName, startDate, endDate, bookingPerson, bookingPrice } = location.state;
    // console.log(projectName);
    
    return (
        
        <>
            {/* <div id="bodyconstraint">
                <div id="bodyconstraint-inner">
                    <div className="bui-container booking-process__container js-booking-process__container js-booking-process__container--stage-2 e2e-stage-container">
                        <div className="bui-grid">
                            <aside className="bui-grid__column bui-grid__column-4@medium">
                                <div className="bui-group bui-group--large">
                                    <div className="bp-mfe-container--property-details">
                                        <div>
                                            <div className="c82435a4b8 a178069f51 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 b68dc84f99">
                                                <div className="c624d7469d a0e60936ad e8f9ae2be9 a3214e5942">
                                                    <div className="c624d7469d f034cf5568 e8f9ae2be9 a937b09340 a3214e5942">
                                                        <div className="dc5041d860 c72df67c95">
                                                            <div className="c624d7469d a0e60936ad a3214e5942">
                                                                <div className="c624d7469d dbf03e5db3 a3214e5942">
                                                                    <div class="">
                                                                        <h1 class="e1eebb6a1e">Name</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="c624d7469d a0e60936ad a3214e5942">
                                                                    <div className="c624d7469d a0e60936ad a3214e5942">
                                                                        <span className="f419a93f12">
                                                                            <button aria-expanded="false" type="button" className="a83ed08757 a9377ef817">
                                                                                <div className="a53cbfa6de">{productData.productAddress}</div>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="c624d7469d f034cf5568 dab7c5c6fa a937b09340 a3214e5942 cbf4befc54">
                                                                            <div className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                                                <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />&nbsp;{rating.rating}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="bui-card bp-card--booking-summary bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-card__header bui-spacer--large ">
                                                <h2 class="bui-card__title">Your booking details</h2>
                                            </header>
                                            <div className="bui-group bui-group--large">
                                                <div className="bui-group bui-group--large">
                                                    <div className="bui-group__item">
                                                        <div className="bui-date-range bui-date-range--large bp-date-range">
                                                            <div className="bui-date-range__item">
                                                                <div id="bp-checkin-date__label" className="bui-date__label">Check-in</div>
                                                                <time className="bui-date bui-date--large">
                                                                    <span className="bui-date__title">{formattedCheckInDate}</span>
                                                                </time>
                                                            </div>
                                                            <div className="bui-date-range__item">
                                                                <div id="bp-checkout-date__label" className="bui-date__label">Check-out</div>
                                                                <time className="bui-date bui-date--large">
                                                                    <span className="bui-date__title">{formattedCheckOutDate}</span>
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bui-group__item bui-group bui-group--small">
                                                        <div class="bui-group__item bui-f-font-emphasized">Total length of stay:</div>
                                                        <div class="bui-group__item bui-f-font-strong">
                                                            {totalDay} night
                                                        </div>
                                                    </div>
                                                    <div className="bui-card__text bp-price-details__total bp-price-details__total--discount-breakdown bp-price-details__total--discount-breakdown-with-bg bp-price-details__total--discount-breakdown-with-discount ">
                                                        <div className="bui-group bui-group--large">
                                                            <div className="bui-group__item">
                                                                <div className="bui-group bui-group--medium">
                                                                    <div className="bui-group__item">
                                                                        <div className="bp-price-details__total-line bp-price-details__total-line--user js-price-details__total-line--user e2e-price-details__total-line--user bp-price-details__total-line--v-align-end">
                                                                            <div className="bp-price-details__charge-type">
                                                                                <div class="bp-price-details__total-price bui-u-padding-end--8">
                                                                                    Total
                                                                                </div>
                                                                            </div>
                                                                            <div className="bui-u-text-right">
                                                                                <div class="bp-price-details__total-price --wrap-nowrap e2e-price-details__total-charge--user" data-price="154880" data-currency-code="VND" data-pd-total-usercurrency="">
                                                                                    <span className="" style={{ display: "inline-block" }}>
                                                                                        VND&nbsp;{totalPrice}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="bui-u-text-right">
                                                                            <div class="bp-price-details__total--taxes-and-charges-info">
                                                                                Includes taxes and fees
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </aside>
                            <main id="content" className="bui-grid__column bui-grid__column-8@medium booking-process__content">
                                <div id="bookForm" className="book-form">
                                    <section className="bui-card bp-card--user-details bui-spacer--large  bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-inline-container">
                                                <div class="bui-inline-container__main">
                                                    <h2 class="bui-text--variant-headline_3">
                                                        Your information details
                                                    </h2>
                                                </div>
                                            </header>
                                            <div className="bui-card__text">
                                                <div className="bp-personal-details-form">
                                                    <div className="bui-grid bui-grid--size-small">
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="name" className="bp_form__field__label">
                                                                    Name
                                                                </label>
                                                                <div class="bui-group__item payment-user-info">{userData.accName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="email" className="bp_form__field__label">
                                                                    Email Address
                                                                </label>
                                                                <div class="bui-group__item payment-user-info">{userData.accEmail}</div>
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="phone" className="bp_form__field__label">
                                                                    Mobile Number
                                                                </label>
                                                                <div class="bui-group__item payment-user-info">{userData.accPhone}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="bui-card bp-card--user-details bui-spacer--large  bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-inline-container">
                                                <div class="bui-inline-container__main">
                                                    <h2 class="bui-text--variant-headline_3">
                                                        Payment Method
                                                    </h2>
                                                </div>
                                                <div class="x9mw82OGJDdT97ho7Wyc H6lzDEPPhc6rnad4mB7d A1lmouXAu10vISnnmR2M">Online Payment</div>
                                            </header>
                                            <div className="my-settings-row my-settings-edit-row--editing">
                                                <div className="my-settings-row">
                                                    <div className="my-settings-edit-row">
                                                        <div className="my-settings-col-shrink my-settings-cell-spacing">
                                                            <h2 id="1e980cc2-21c6-4425-ad21-9f1c127fe541_title" className="x9mw82OGJDdT97ho7Wyc my-settings-title bui-f-font-featured bui-spacer--large">
                                                                Payment cards
                                                            </h2>
                                                        </div>
                                                        <div className="my-settings-col-grow my-settings-cell-spacing">
                                                            <div className="my-settings-flex-by-row my-settings-flex-by-row--reverse">
                                                                <div className="my-settings-flex-grow">
                                                                    <div className="pc-pm-section">
                                                                        <div className="PaymentMethodSelectorstyles__PaymentMethodButtonsContainer-sc-2csqpk-1 dnrAFC single-payment-method desktop-mode">
                                                                            <h3 className="PaymentMethodSelectorstyles__PaymentMethodTitle-sc-2csqpk-4 cnZRHr">
                                                                                <div class="dFDboCg6ONrjf7Ra7Mvq"></div>
                                                                                <span>
                                                                                    <div className="AvailablePaymentMethods__AvailablePaymentMethodsContainer-sc-1pb77ap-0 ikbMPt bui-spacer--large pc-available-payment-methods-container">
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/amex.svg" alt="American Express" title="American Express" aria-hidden="false" height="18" width="30" className="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg" alt="MasterCard" title="MasterCard" aria-hidden="false" height="18" width="30" className="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/cartebancaire.svg" alt="Carte Bancaire" title="Carte Bancaire" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg" alt="JCB" title="JCB" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/diners.svg" alt="Diners Club" title="Diners Club" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg" alt="Discover" title="Discover" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg" alt="Visa" title="Visa" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/unionpay.svg" alt="China UnionPay" title="China UnionPay" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </h3>
                                                                        </div>
                                                                        <div className="bui-spacer--large">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="s7CqeD">
                                                        <div class="sQArKu">
                                                            <div class="xINqui">Click "Book" means you agree to abide by
                                                                <a target="_blank" rel="noopener noreferrer" previewlistener="true" className="payment-term"><ModalTerm /></a>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={`stardust-button stardust-button--CD9A2B stardust-button--large LtH6tW ${isLoading ? 'disabled' : ''}`}
                                                            onClick={handleSubmit}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? 'Booking...' : 'Book'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}