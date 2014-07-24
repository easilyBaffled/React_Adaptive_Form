    /**
	 * @jsx React.DOM
	 */
    var Adaptive_Input = React.createClass({ 
    	handle_change: function(event_data){
    		var new_text = event_data.target.value;//this.refs.input.getDOMNode().value;
    		this.props.on_Input_Change(new_text);
    	},
    	render: function(){
    		var cx = React.addons.classSet;
    		  var classes = cx({    		    
    		    'invalid_label': 'invalid_label',
    		    'invalid': 'invalid',
    		    'invisible': this.props.validity
    		  });
    		return (
    				<div className='adaptive_placeholder_input_container'>
    					<input 
    						className="adaptive_input"
    						type="text" 
    						required="required" 
    						onChange= {this.handle_change}
    						ref="input"
    					></input>
    					<label
    						className="adaptive_placeholder"
    						alt={this.props.initial}
    						placeholder={this.props.focused}
    					></label>
    					<label
							className={classes}
    					>Value is not a number.</label>
    				</div>    			
    				);
    	}
    });
    
    var Form = React.createClass({
    	render: function(){
    		return (
    				<form>
    					<Adaptive_Input
    						initial={'Name Input'}
    						focused={'Name Input'}
    						on_Input_Change={this.props.handle_text_input}
    						validity={true}
    					/>
    					<Adaptive_Input
							initial={'Value 1'}
							focused={'Value 1'}
    						on_Input_Change={this.props.handle_value_1_input}
    						validity={this.props.value_1_valid}
    					/>
    					<Adaptive_Input
    						initial={'Value 2'}
    						focused={'Value 2'}
    						on_Input_Change={this.props.handle_value_2_input}
    						validity={this.props.value_2_valid}
    					/>
    				</form>
    				);
    	}
    });
    
    var Page = React.createClass({
    	getInitialState: function(){
    		return {
    			Name : "No Name",
    			Text_Valid: true,
    			Value_1 : '0',
    			Value_1_Valid: true,
    			Value_2 : '0',
    			Value_2_Valid: true,
    			Display_Value: '0'
    		};
    	},
    	handle_text_input: function(new_text){
    		this.setState({
    				Name: new_text
    			});
    	},
    	handle_value_1_input: function(new_value){
    		new_value = parseInt(new_value);
    		if(isNaN(new_value)){
                console.log(new_value);
    			this.setState({
    				Value_1_Valid: false
    			});
    		} else{
	    		var updated_display = new_value + parseInt(this.state.Value_2);
	    		updated_display = updated_display.toString();
	    		this.setState({
	    				Value_1: new_value,
	    				Value_1_Valid: true,
	    				Display_Value: updated_display
	    			});
    		}
    	},
    	handle_value_2_input: function(new_value){
    		new_value = parseInt(new_value);
    		if(isNaN(new_value)){
    			this.setState({
    				Value_2_Valid: false
    			});
    		} else{
	    		var updated_display = parseInt(this.state.Value_1) + new_value;
	    		updated_display = updated_display.toString();
	    		this.setState({
	    				Value_2: new_value,
	    				Value_2_Valid: true,
	    				Display_Value: updated_display
	    			});
    		}
    	},
    	render: function(){
    		var display_class = 'invalid';
    		if(this.state.Value_1_Valid && this.state.Value_2_Valid){
    			display_class = 'valid';
    		}
    		return(
    				<div>
    					<h2>{this.state.Name}</h2>
    					<h2 className={display_class}>Value 1 + Value 2 = {this.state.Display_Value}</h2>
    					<Form
    						handle_text_input={this.handle_text_input}
    						text_valid = {this.state.Text_Valid}
    						handle_value_1_input = {this.handle_value_1_input}
    						value_1_valid = {this.state.Value_1_Valid}	
    						handle_value_2_input = {this.handle_value_2_input}
    						value_2_valid = {this.state.Value_2_Valid}
    					/>
    				</div>
    		);
    	}
    });

    
    React.renderComponent(<Page />, document.body);