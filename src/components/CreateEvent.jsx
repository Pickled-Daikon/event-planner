import React from 'react';
import {Form, Button, TextArea, Transition, Image, Header} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput
} from 'semantic-ui-calendar-react';
import {createEvent, getAllEvents} from "../api/events";



class CreateEvent extends React.Component {

    state = {visible: true, open: false, result: 'hello'};

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }))

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            date: '',
            startTime: '',
            endTime: '',
        };
    }

    onSubmit = () => {
        const {name, description, date, startTime, endTime} = this.state;

        const startDateObj = new Date(date);
        const endDateObj = new Date(date);
        console.log(date);

        // do work here setting month, day, hrs, etc

        console.log(startDateObj.toString());


        startDateObj.setHours(startTime.slice(0, 2));
        console.log(startDateObj.toString());

        startDateObj.setMinutes(startTime.slice(3, 5));
        endDateObj.setHours(endTime.slice(0, 2));
        endDateObj.setMinutes(endTime.slice(3, 5));


        const startDateStr = startDateObj.toString();
        const endDateStr = endDateObj.toString();

        createEvent({name, description, startDateTime: startDateStr, endDateTime: endDateStr})
            .then((newDate) => {
                if(newDate.hasOwnProperty('error')){
                    this.props.setCreateSuccess(2);
                } else {
                    this.props.setCreateSuccess(1);
                }
            }).then(() => {
                return getAllEvents();

        }).then((events) =>{
            console.log(events)
            this.props.setCreateSuccess(0);

        })
            .catch((e) => {
                this.props.setCreateSuccess(2);

            });
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {
        const { visible } = this.state

        return (
<>
            <Form>
                <TextArea name='name' value={this.state.name} onChange={this.handleChange} rows={1} placeholder='Name of event'/>
                <br/><br/>
                <TextArea name='description' value={this.state.description} onChange={this.handleChange} rows={1} placeholder='Description'/>
                <br/><br/>
                <DateInput
                    closable={true}
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <TimeInput
                    closable={true}

                    name="startTime"
                    placeholder="Time Start"
                    value={this.state.time}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <TimeInput
                    closable={true}

                    name="endTime"
                    placeholder="Time End"
                    value={this.state.time}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        <br/>
            <Button onClick={()=>{this.onSubmit(); this.toggleVisibility();}}> Add event
            </Button>
    <Transition visible={!visible} animation='scale' duration={500}>
        <Header>Event Handled</Header>
    </Transition>
            </>

        );
    }
}

export default CreateEvent;
