export const themeSD = {
  colors: ['#058DC7'],
  chart: {
    backgroundColor: {
      // linearGradient: [0, 0, 500, 500],
      stops: [[0, 'rgb(255, 255, 255)'], [1, 'rgb(240, 240, 255)']],
    },
    borderWidth: 0,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotShadow: true,
    plotBorderWidth: 1,
  },
  title: {
    style: {
      color: '#000',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: '#666666',
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  xAxis: {
    gridLineWidth: 1,
    lineColor: '#000',
    tickColor: '#000',
    labels: {
      style: {
        color: '#000',
        font: '11px Trebuchet MS, Verdana, sans-serif',
      },
    },
    title: {
      style: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif',
      },
    },
  },
  yAxis: {
    alternateGridColor: null,
    minorTickInterval: 'auto',
    lineColor: '#000',
    lineWidth: 1,
    tickWidth: 1,
    tickColor: '#000',
    labels: {
      style: {
        color: '#000',
        font: '11px Trebuchet MS, Verdana, sans-serif',
      },
    },
    title: {
      style: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif',
      },
    },
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'black',
    },
    itemHoverStyle: {
      color: '#039',
    },
    itemHiddenStyle: {
      color: 'gray',
    },
  },
  credits: {
    style: {
      right: '10px',
    },
  },
  labels: {
    style: {
      color: '#99b'
    }
  }
};


