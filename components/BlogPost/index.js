// @flow

import React from 'react';
import PropTypes from "prop-types";
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client';
import PageError from "../PageError";

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.highlight = new Promise(resolve => require.ensure(["highlight.js"], () => resolve(require("highlight.js"))))
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        if (typeof document !== 'undefined') {
            Array.from(document.querySelectorAll('pre code')).forEach(node => {
                this.highlight.then(hljs => hljs.highlightBlock(node));
            })
        }
    }

    render() {
        const { hasError, page } = this.props;

        if (hasError) {
            return <PageError error={page.error} />;
        }

        return (
            <div>
                {page.node &&
                <article>
                    <h1>{page.node.title}</h1>
                    <BodyRenderer>{page.node.body}</BodyRenderer>
                </article>}
            </div>
        );
    }
}

BlogPost.propTypes = {
    hasError: PropTypes.bool,
    page: PropTypes.object
};

const BlogPostContainer = createContainer(BlogPost, props => ({
    page: query({ collection: 'posts', id: props.params.splat })
}));

export default BlogPostContainer;
