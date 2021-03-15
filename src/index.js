import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';

function App() {
    // set start / end time
    const [ startTime, setStartTime ] = useState({
        hr: 12,
        min: 0,
        sec: 0,
    });

    const [ endTime, setEndTime ] = useState({
        hr: 13,
        min: 0,
        sec: 0,
    });

    return (
        <>
            <header className="bg-secondary p-3">
                <h1 className="fw-lighter text-center text-white">Time Calculator</h1>
            </header>
            <div className="col-md-6 offset-md-3 p-3">
                <Controls 
                    startTime={startTime} 
                    setStartTime={setStartTime} 
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <Display 
                    startTime={startTime} 
                    endTime={endTime} 
                />
            </div>
        </>
    );
}

function Controls({ 
    startTime, 
    setStartTime, 
    endTime, 
    setEndTime
}) {

    // edit start / end time when changes are made
    function onChange(e) {
        switch (e.target.id) {
            case 'start-time-hr':
                setStartTime({
                    ...startTime,
                    hr: parseInt(e.target.value),
                });
                break;
            case 'start-time-min':
                setStartTime({
                    ...startTime,
                    min: parseInt(e.target.value),
                });
                break;
            case 'start-time-sec':
                setStartTime({
                    ...startTime,
                    sec: parseInt(e.target.value),
                });
                break;
            case 'end-time-hr':
                setEndTime({
                    ...endTime,
                    hr: parseInt(e.target.value),
                });
                break;
            case 'end-time-min':
                setEndTime({
                    ...endTime,
                    min: parseInt(e.target.value),
                });
                break;
            case 'end-time-sec':
                setEndTime({
                    ...endTime,
                    sec: parseInt(e.target.value),
                });
            break;
        }
    }

    return (
        <form className="mb-4 pb-4 border-bottom border-gray">
            <TimeInput 
                id="start-time" 
                time={startTime}
                onChange={onChange}  
            />
            <TimeInput 
                id="end-time" 
                time={endTime} 
                onChange={onChange}
            />
        </form>
    );
}

function TimeInput(props) {

    // use to create range for select options
    const range = (start, end, length = end - start + 1) => Array.from({ length }, (_, i) => start + i)

    // generate hours list
    const hours = range(0, 23).map((number) => {
        if (number < 10) {
            return <option value={number} key={number.toString()}>{`0${number}`}</option>
        } else {
            return <option value={number} key={number.toString()}>{number}</option>
        }
    });

    // generate minutes / seconds list
    const minSec = range(0, 59).map((number) => {
        if (number < 10) {
            return <option value={number} key={number.toString()}>{`0${number}`}</option>
        } else {
            return <option value={number} key={number.toString()}>{number}</option>
        }
    });

    return (
        <div id={props.id}>
            <p className="form-label text-capitalize">{props.id.replace('-', ' ')}</p>
            <div className="input-group mb-3">
                <label className="input-group-text bg-light" htmlFor={props.id + '-hr'}>hr:</label>
                <select className="form-select" id={props.id + '-hr'} onChange={props.onChange} value={props.time.hr}>
                    {hours}
                </select>
                <label className="input-group-text bg-light" htmlFor={props.id + '-min'}>min:</label>
                <select className="form-select" id={props.id + '-min'} onChange={props.onChange} value={props.time.min}>
                    {minSec}
                </select>
                <label className="input-group-text bg-light" htmlFor={props.id + '-sec'}>sec:</label>
                <select className="form-select" id={props.id + '-sec'} onChange={props.onChange} value={props.time.sec}>
                    {minSec}
                </select>
            </div>
        </div>
    );
}

function Display({ startTime, endTime }) {

    const duration = {};

    if (endTime.hr < startTime.hr) {
        duration.hours = endTime.hr - startTime.hr + 24;
    } else {
        duration.hours = endTime.hr - startTime.hr;
    }

    if (endTime.min < startTime.min) {
        duration.minutes = endTime.min - startTime.min + 60;
        duration.hours--;
    } else {
        duration.minutes = endTime.min - startTime.min;
    }

    if (endTime.sec < startTime.sec) {
        duration.seconds = endTime.sec - startTime.sec + 60;
        if (duration.minutes === 0) {
            duration.hours--;
            duration.minutes += 59;
        } else duration.minutes--;
    } else {
        duration.seconds = endTime.sec - startTime.sec;
    }

    if (duration.hours < 0) {
        duration.hours += 24;
    }

    return (
        <div id="display" className="text-center">
            <h3 className="fw-lighter">Result:</h3>
            <p className="fs-4 fw-lighter">
                {`${duration.hours} Hour(s),
                ${duration.minutes} Minute(s), 
                ${duration.seconds} Second(s)`}
            </p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));