import React from 'react';
import './tooltip.css'

function convert(minutes){
    let numbers = minutes.split(":");
    return Math.round(100*(parseFloat(numbers[0]) + (parseFloat(numbers[1]) / 60)))/100;
}

export default ({hoveredBar, scales}) => {
    const { xScale, yScale } = scales
    const styles = {
        position: "absolute",
        left: `${xScale(hoveredBar.Year) + 30}px`,
        top: `${yScale(convert(hoveredBar.Time)) - 30}px`
    }
  
    return (
      <div className="Tooltip" style={styles}>
        <table>
          <thead>
            <tr>
              <th colSpan="1">{hoveredBar.Name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="1">Nationality: {hoveredBar.Nationality}</td>
            </tr>
            <tr id="doping">
              <td colSpan="1">{hoveredBar.Doping}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }