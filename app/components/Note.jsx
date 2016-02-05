import React from 'react';


export default class Note extends React.Component {

    constructor(props) {
        super(props);

        // track editing state
        this.state = {
            editing: false
        };
    }

    render() {
        // Render component depending on state
        if (this.state.editing) {
            return this.renderEdit();
        }

        return this.renderNote();
    }

    renderEdit = () => {

        // Deal with blur/input handlers. Map to DOM events.
        // Set selection to input end using callb at ref.
        // triggered after component is mounted

        return <input type="text"
            ref={
                (e) => e ? e.selectionStart = this.props.task.length : null
            }
          autoFocus={true}
          defaultValue={this.props.task}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter}
        />;
    };

    renderNote = () => {
        const onDelete = this.props.onDelete;

        return (
            <div onClick={this.edit}>
                <span className="task">{this.props.task}</span>
                { onDelete ? this.renderDelete() : null }
            </div>
        );
    };

    renderDelete = () => {
        return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
    };

    edit = () => {
        this.setState({
            editing: true
        });
    };

    checkEnter = (e) => {
        // User hit *enter* finish up
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if (this.props.onEdit && value.trim()) {
            this.props.onEdit(value);

            this.setState({
                editing: false
            });
        }
    };


}