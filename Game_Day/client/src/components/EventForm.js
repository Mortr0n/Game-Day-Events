import React, { useState } from 'react';
import { format } from 'date-fns';

const EventForm = (props) => {
    // worlds longest line ahead...LOOKOUT!
    const { errors, onSubmitProp, initialEventName,  initialStreetAddress, initialCity, initialState, initialZip, initialAttendeeMax, initialDate, initialSuggestedGame, initialEventDescription } = props;    
    const [ eventName, setEventName ] = useState(initialEventName);
    const [ streetAddress, setStreetAddress ] = useState(initialStreetAddress);
    const [ city, setCity ] = useState(initialCity);
    const [ state, setState ] = useState(initialState);
    const [ zip, setZip ] = useState(initialZip);
    const [ attendeeMax, setAttendeeMax ] = useState(initialAttendeeMax);
    const [ date, setDate ] = useState(initialDate);
    const [ suggestedGame, setSuggestedGame ] = useState(initialSuggestedGame);
    const [ eventDescription, setEventDescription ] = useState(initialEventDescription);
    // for select in form.
    const allStates = [
        "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", 
        "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", 
        "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", 
        "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", 
        "WY"
    ]
    
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // pass items for the submitProp which will either be for update or create
        onSubmitProp({ 
            eventName,
            streetAddress,
            city,
            state,
            zip,
            attendeeMax,
            date,
            suggestedGame,
            eventDescription
        })
    }

    return(
        <div className='eventForm container'>
            <form onSubmit={formSubmitHandler}>
            <div className='row'>
                <div className='col-4 offset-2'>
                    <div className='form-floating mb-2'>
                        <input 
                        type="text"
                        className='form-control'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)} />
                        {
                            errors.eventName ?
                            <label htmlFor='eventName' className='form-label red'>{errors.eventName.message}</label> :
                            <label htmlFor='eventName' className='form-label'>Event Name</label>
                        }
                    </div>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)} />
                        {
                            errors.streetAddress ?
                            <label htmlFor='streetAddress' className='form-label red'>{errors.streetAddress.message}</label> :
                            <label htmlFor='streetAddress' className='form-label'>Street Address</label>
                        }
                    </div>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={city}
                        onChange={(e => setCity(e.target.value))} />
                        {
                            errors.city ?
                            <label htmlFor='city' className='form-label red'>{errors.city.message}</label> :
                            <label htmlFor='city' className='form-label'>City</label>
                        }
                    </div>
                    {/* State drop down */}
                    <div className='form-floating'>
                        <select
                        className='form-select'
                        value={state}
                        onChange={(e => setState(e.target.value))}
                        >
                            <option value={state}>{state}</option>
                            {
                                allStates.map((state, index) => {
                                    return(
                                        
                                        <option key={index}  value={state}>{state}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.state ?
                            <label htmlFor='state' className='form-label red'>{errors.state.message}</label> :
                            <label htmlFor='state' className='form-label'>State</label>
                        }
                    </div>

                    </div>
                    <div className='col-4'>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={zip}
                        onChange={(e => setZip(e.target.value))} />
                        {
                            errors.zip ?
                            <label htmlFor='zip' className='form-label red'>{errors.zip.message}</label> :
                            <label htmlFor='zip' className='form-label'>Zip</label>
                        }
                    </div>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={attendeeMax}
                        onChange={(e => setAttendeeMax(e.target.value))} />
                        {
                            errors.attendeeMax ?
                            <label htmlFor='attendeeMax' className='form-label red'>{errors.attendeeMax.message}</label> :
                            <label htmlFor='attendeeMax' className='form-label'>Max Attendees</label>
                        }
                    </div>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={date}
                        onChange={(e => setDate(e.target.value))} />
                        {
                            errors.date ? 
                            <label htmlFor='date' className='form-label red'>{errors.date.message}</label> :
                            <label htmlFor='date' className='form-label'>Date</label>
                        }
                    </div>
                    <div className='form-floating'>
                        <input
                        type="text"
                        className='form-control mb-2'
                        value={suggestedGame}
                        onChange={(e => setSuggestedGame(e.target.value))} />
                        {
                            errors.suggestedGame ?
                            <label htmlFor='suggestedGame' className='form-label red'>{errors.suggestedGame.message}</label> :
                            <label htmlFor='suggestedGame' className='form-label'>Suggested Game(s)</label>
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 offset-2'>
                    <div className='form-floating'>
                        <input
                        type="textarea"
                        className='form-control mb-2 ms-2'
                        value={eventDescription}
                        onChange={(e => setEventDescription(e.target.value))} />
                        {
                            errors.eventDescription ?
                            <label htmlFor='eventDescription' className='form-label red'>{errors.eventDescription.message}</label> :
                            <label htmlFor='eventDescription' className='form-label'>Event Description</label>
                        }
                    </div>
                    </div>
                </div>

            </div>
                <button 
                type="submit"
                className='btn btn-primary' >Submit</button>
            </form>
        </div>
    )
}
export default EventForm;

