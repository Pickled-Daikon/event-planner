
import React from 'react';
import { Form } from 'semantic-ui-react';
import {
    DateInput,
  // DateInput,
  // TimeInput,
   //DateTimeInput
  // DatesRangeInput
} from 'semantic-ui-calendar-react';

class Calender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            dateTime: '',
            datesRange: ''
        };
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    render() {
        return (
            <Form>
                <DateInput
                    inline
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        );
    }
}

export default Calender;
