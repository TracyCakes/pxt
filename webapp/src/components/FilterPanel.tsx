import * as React from "react";
import * as sui from "../sui";

interface FilterTagProps {
    tag: string;
    selected: boolean;
    onClickHandler: (selected: string) => void;
}

export class FilterTag extends React.Component<FilterTagProps> {
    constructor(props: FilterTagProps) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
    }

    render() {
        return <div className="filter-tag">
            <div className="filter-tag-box" role="checkbox" onClick={this.clickHandler} onKeyDown={sui.fireClickOnEnter} aria-checked={this.props.selected}>
                <i className={`icon square outline ${this.props.selected ? "check" : ""}`}></i>
            </div>
            <div className="filter-tag-name" role="button" onClick={this.clickHandler} onKeyDown={sui.fireClickOnEnter}>{lf(this.props.tag)}</div>
        </div>
    }

    protected clickHandler() {
        this.props.onClickHandler(this.props.tag);
    }
}


interface FilterPanelSubheadingProps {
    subheading: string;
    buttonText?: string;
    buttonAction?: () => void;
}

export class FilterPanelSubheading extends React.Component<FilterPanelSubheadingProps> {

    render() {
        return <div className="filter-subheading-row">
            <div className="filter-subheading-title">{`${lf(this.props.subheading)}:`}</div>
            {this.props.buttonText && <div className="filter-subheading-button" role="button" onClick={this.props.buttonAction} onKeyDown={sui.fireClickOnEnter} >{lf(this.props.buttonText)}</div>}
        </div>
    }
}

interface FilterPanelProps {
    enabledTags: string[];
    tagClickHandler: (tag: string) => void;
    clearTags: () => void;
    tagOptions: string[];
}

export class FilterPanel extends React.Component<FilterPanelProps> {
    protected isTagSelected(tag: string) {
        return this.props.enabledTags.indexOf(tag.toLowerCase()) >= 0;
    }

    render() {
        const tags = this.props.tagOptions;
        return <div className="filter-panel">
            <div className="filter-title">{lf("Filter")}</div>
            <FilterPanelSubheading subheading={"Categories"} buttonText="Clear" buttonAction={this.props.clearTags}/>
            <div className="filter-tag-list">
                {tags.map(tag => <FilterTag key={tag} tag={tag} selected={this.isTagSelected(tag)} onClickHandler={this.props.tagClickHandler}/>)}
            </div>
        </div>
    }
}