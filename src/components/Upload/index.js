import React, { Component } from "react";
import "../../Upload.css";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event) {
        this.setState({
            fileSelected: true
        });

        if (this.props.file !== null) {
            URL.revokeObjectURL(this.props.file);
        }
        
        //Uncomment this if you wish to preview the image right after selection
        this.props.onUpload(event);

        // Create a FormData to POST to backend
        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append("file", files[0]); // key - value

        // Send to Flask
        const response = await fetch(`http://localhost:5000/`, {
            method: 'POST',
            body: formData,
            contentType: false,
            processData: false
        });
        
        const data = await response.json();
        this.setState({
            uploading: true
        });

        // Alternatively, if using send_file(), you can use a FileReader instance to read the blob image
        // .then(blob => {
        //     let reader = new FileReader();
        //     reader.onload = (event) => {
        //         this.setState({
        //             file: event.target.result,
        //             uploading: true
        //         });
        //     }
        //     reader.readAsDataURL(blob);
        // });
        // .then(images => {
        //     this.setState({ 
        //         uploading: false,
        //         images
        //     })
        // })
    }

    render() {
        return (
            <div>
            <input type="file" id="file" className="file-input" onChange={this.handleChange} />
            <label htmlFor="file" className={this.state.fileSelected ? "file-label-selected" : "file-label"}>
                {this.state.fileSelected ? "Picture Selected" : "Select a Picture"}
            </label>
            <br />
            { this.props.file && <img src={this.props.file} alt="jeye"/> }
        </div>
        );
    }
}

export default Upload;
