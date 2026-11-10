import React from 'react';
import {AlertTriangle} from 'lucide-react';
export const dueCount=(data,topic)=>Object.values(data.v22?.[topic]?.reviews||{}).filter(x=>x.stage<3&&x.dueAt<=Date.now()).length;
export class ErrorBoundary extends React.Component{constructor(p){super(p);this.state={error:null}}static getDerivedStateFromError(error){return{error}}render(){if(this.state.error)return <div className="panel error-box"><AlertTriangle size={24}/><h3>We couldn’t open this view.</h3><p>The rest of your progress is safe on this device. Try loading this view again.</p><button className="outline" onClick={()=>this.setState({error:null})}>Try again</button></div>;return this.props.children}}
