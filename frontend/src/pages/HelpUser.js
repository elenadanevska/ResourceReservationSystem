import React, { useState } from 'react';
import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "How does the resource reservation system work?",
            content: ` online booking system uses smart technology that eliminates the risks associated with manual input and human error. It simplifies the booking process
            for you and your customers by automatically updating processes such as payment scheduling, inventory management and tracking bookings.`,
        },
        {
            title: "I reserved a resource but I don't need it anymore. Till when can I cancel?",
            content:
                "Zpu can cancel in any time",
        },
        {
            title: "I can not find the resource I need. Who should I cotactt?",
            content: `You can write on the following email: aa@fri.uni-lj.si `,
        },
    ],
};

const styles = {
    titleTextColor: "black",
    rowTitleColor: "gray",
};

const config = {
    animate: true,
};

const ContactForm = () => {
    return (
        <form method="POST">
            <div className="mb-3 pt-0">
                <input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <input
                    type="email"
                    placeholder="Topic"
                    name="topic"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <textarea
                    placeholder="Your message"
                    name="message"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <button
                    className="btn btn-primary text-white text-sm shadow-none"
                    type="submit">
                    Send a message
                </button>
            </div>
        </form>
    );
}

const HelpUser = props => {
    return (
        <div>
            <h2 className="page-header">
                User support
            </h2>
            <div>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
            </div>
        </div>
    );

}

export default HelpUser;