// Textos de la página (ES/EN). Generados a partir de los de nanoredlabs.com.
export interface PageContent {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; answer: string; toolTitle: string; howToTitle: string
  howToSteps: [string, string][]
  sections: { title: string; paragraphs?: string[]; list?: string[] }[]
  limitsTitle: string; limits: string[]; faqTitle: string; faqs: [string, string][]
}

export const content: Record<'es' | 'en', PageContent> = {
  "es": {
    "metaTitle": "Calculadora de mantenimiento predictivo: paradas vs. monitorizar",
    "metaDescription": "Calcula gratis el coste anual de tus paradas no planificadas y cuántas horas de parada tendría que evitar la monitorización para pagarse. Con tus datos, sin registro.",
    "eyebrow": "Herramienta gratuita · Industrial",
    "h1": "Calculadora de mantenimiento predictivo",
    "answer": "Esta calculadora gratuita de NanoRed Labs (Málaga) compara lo que te cuestan al año las paradas no planificadas de un equipo o una línea (horas de parada por su coste por hora, más las reparaciones) con lo que costaría monitorizarlo, y te da el punto de equilibrio: cuántas horas de parada al año tendría que evitar la monitorización para pagarse. Todas las cifras las pones tú; no aplica porcentajes de reducción ni promete resultados. Funciona en tu navegador: los datos no se envían a ningún servidor.",
    "toolTitle": "Calcula el coste de tus paradas",
    "howToTitle": "Cómo se usa",
    "howToSteps": [
      [
        "Estima el coste de una hora de parada",
        "Suma la producción que se deja de hacer (o su margen), el personal que queda parado y los costes de urgencia: horas extra, transporte urgente, penalizaciones."
      ],
      [
        "Pon las paradas de un año",
        "Horas de parada no planificada por averías y en cuántas averías se reparten, del equipo o la línea que quieres analizar. Saca los datos de los partes o del sistema de mantenimiento."
      ],
      [
        "Añade la reparación",
        "El coste medio de reparar cada avería: piezas, mano de obra y servicio externo. Si ya lo has metido en el coste por hora, pon 0."
      ],
      [
        "Compara con monitorizar",
        "Escribe tu estimación del coste anual de monitorizar ese activo y verás cuántas horas de parada, o cuántas averías, tendría que evitar para pagarse."
      ]
    ],
    "sections": [
      {
        "title": "Cómo se calcula",
        "paragraphs": [
          "Coste anual de las paradas = horas de parada al año × coste por hora + averías al año × coste medio de reparación.",
          "Punto de equilibrio en horas = coste anual de monitorizar ÷ coste de una hora de parada. Es una cuenta conservadora: no cuenta la reparación que también se ahorraría. Por eso se da además el equilibrio en averías completas (horas de parada más reparación de cada una).",
          "No se aplica ningún porcentaje de mejora: la calculadora no sabe cuántas paradas evitará la monitorización en tu planta, y nadie puede saberlo sin mirar tus datos."
        ]
      },
      {
        "title": "Cuándo tiene sentido plantearse el mantenimiento predictivo",
        "list": [
          "Las paradas de ese activo son caras o frecuentes, y el fallo da señales antes (vibración, temperatura, consumo, presión…).",
          "Hay histórico: partes de avería con fechas y, si es posible, señales registradas de los meses anteriores.",
          "Alguien puede actuar con el aviso: revisar, programar la intervención y tener la pieza a tiempo.",
          "Si el punto de equilibrio sale en unas pocas horas al año frente a muchas horas de parada, merece la pena evaluar los datos; si sale por encima de lo que paras hoy, probablemente no."
        ]
      }
    ],
    "limitsTitle": "Lo que conviene saber",
    "limits": [
      "El resultado depende de tus estimaciones, sobre todo del coste por hora de parada: si dudas, prueba con una cifra prudente y otra alta.",
      "Es una cuenta de equilibrio, no una previsión de ahorro ni una promesa de reducción de paradas.",
      "No tiene en cuenta beneficios indirectos (seguridad, calidad, planificación de repuestos) ni costes de implantación aparte de los que incluyas en el coste anual.",
      "Monitorizar no evita averías por sí solo: hace falta que las señales anticipen ese modo de fallo y que el equipo pueda actuar a tiempo."
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqs": [
      [
        "¿Cómo calculo el coste de una hora de parada?",
        "Suma la producción perdida en esa hora (unidades que no se fabrican por su margen, o su precio si no puedes recuperarlas), el coste del personal que queda parado y los costes de urgencia que provoca la parada: horas extra para recuperar, transporte urgente o penalizaciones. Una estimación razonable basta para empezar."
      ],
      [
        "¿Qué es el punto de equilibrio de la monitorización?",
        "Son las horas de parada al año que la monitorización tendría que evitar para que su coste quede cubierto: coste anual de monitorizar dividido entre el coste de una hora de parada. Si es una fracción pequeña de lo que paras hoy, merece la pena estudiar si los datos lo permiten."
      ],
      [
        "¿Cuánto reduce las paradas el mantenimiento predictivo?",
        "No damos un porcentaje porque depende del activo, de sus modos de fallo, de las señales disponibles y de la capacidad de actuar. Por eso la calculadora no lo aplica: te dice cuánto tendría que evitar para pagarse, y eso se compara con lo que se pueda comprobar en una prueba acotada."
      ],
      [
        "¿Qué debo incluir en el coste de monitorizar?",
        "Sensores e instalación repartidos por los años que esperas usarlos, conectividad, software o servicio, y el tiempo del equipo para revisar los avisos. Pon tu propia estimación o la de un presupuesto que tengas."
      ],
      [
        "¿Y si la monitorización cuesta más que las paradas?",
        "La calculadora te lo dice: por ahorro directo no se pagaría. Puede seguir teniendo sentido por seguridad, calidad o para planificar repuestos, pero eso se valora aparte y con otros criterios."
      ],
      [
        "¿Se guardan o se envían mis datos?",
        "No. El cálculo se hace en tu navegador. Las cifras de tu planta no se envían a ningún servidor ni se guardan; la analítica de la web solo registra que se ha usado la calculadora."
      ],
      [
        "¿Para qué equipos sirve?",
        "Para cualquier activo o línea en el que puedas estimar horas de parada y su coste: motores, bombas, compresores, reductoras, prensas, líneas de envasado… Lo útil es analizar cada activo crítico por separado."
      ]
    ]
  },
  "en": {
    "metaTitle": "Predictive maintenance calculator: downtime vs monitoring",
    "metaDescription": "Work out the annual cost of your unplanned downtime and how many downtime hours monitoring would need to avoid to pay for itself. Free, your figures, no sign-up.",
    "eyebrow": "Free tool · Industrial",
    "h1": "Predictive maintenance calculator",
    "answer": "This free calculator by NanoRed Labs (Málaga, Spain) compares what unplanned downtime on a machine or line costs you each year (downtime hours at their hourly cost, plus repairs) with what monitoring it would cost, and gives you the break-even point: how many downtime hours a year monitoring would need to avoid to pay for itself. You enter every figure; it applies no reduction percentages and promises no results. It runs in your browser: your data is never sent to a server.",
    "toolTitle": "Work out what downtime costs you",
    "howToTitle": "How to use it",
    "howToSteps": [
      [
        "Estimate the cost of one hour of downtime",
        "Add up the production lost (or its margin), the staff left idle and the emergency costs: overtime, express transport, penalties."
      ],
      [
        "Enter a year of stoppages",
        "Unplanned downtime hours caused by failures and how many failures they are spread over, for the machine or line you want to analyse. Take the data from work orders or your maintenance system."
      ],
      [
        "Add the repair",
        "The average cost of repairing each failure: parts, labour and external service. If it is already in the hourly cost, enter 0."
      ],
      [
        "Compare with monitoring",
        "Enter your estimate of the annual cost of monitoring that asset to see how many downtime hours, or how many failures, it would need to avoid to pay for itself."
      ]
    ],
    "sections": [
      {
        "title": "How it is calculated",
        "paragraphs": [
          "Annual cost of downtime = downtime hours per year × cost per hour + failures per year × average repair cost.",
          "Break-even in hours = annual cost of monitoring ÷ cost of one hour of downtime. It is conservative: it does not count the repair that would also be saved. That is why the break-even is also given in whole failures (downtime hours plus repair for each).",
          "No improvement percentage is applied: the calculator does not know how many stoppages monitoring will avoid at your plant, and nobody can know without looking at your data."
        ]
      },
      {
        "title": "When predictive maintenance is worth considering",
        "list": [
          "Stoppages on that asset are expensive or frequent, and the failure gives signs beforehand (vibration, temperature, current draw, pressure…).",
          "There is history: failure reports with dates and, if possible, signals recorded over the previous months.",
          "Someone can act on the alert: inspect, schedule the intervention and have the part in time.",
          "If the break-even is a few hours a year against many hours of downtime, it is worth assessing the data; if it is above what you lose today, it probably is not."
        ]
      }
    ],
    "limitsTitle": "Good to know",
    "limits": [
      "The result depends on your estimates, especially the cost per hour of downtime: if in doubt, try a cautious figure and a high one.",
      "It is a break-even calculation, not a savings forecast or a promise to reduce downtime.",
      "It does not account for indirect benefits (safety, quality, spare-parts planning) or implementation costs beyond those you include in the annual cost.",
      "Monitoring does not prevent failures on its own: the signals must anticipate that failure mode and the team must be able to act in time."
    ],
    "faqTitle": "Frequently asked questions",
    "faqs": [
      [
        "How do I calculate the cost of one hour of downtime?",
        "Add the production lost in that hour (units not made times their margin, or their price if you cannot make them up), the cost of idle staff and the emergency costs the stoppage causes: overtime to catch up, express transport or penalties. A reasonable estimate is enough to start."
      ],
      [
        "What is the monitoring break-even point?",
        "It is the number of downtime hours per year that monitoring would need to avoid to cover its cost: annual monitoring cost divided by the cost of one hour of downtime. If it is a small fraction of your current downtime, it is worth studying whether the data supports it."
      ],
      [
        "How much does predictive maintenance reduce downtime?",
        "We do not give a percentage because it depends on the asset, its failure modes, the signals available and the ability to act. That is why the calculator does not apply one: it tells you how much it would need to avoid to pay for itself, which can then be compared with what a bounded trial shows."
      ],
      [
        "What should I include in the cost of monitoring?",
        "Sensors and installation spread over the years you expect to use them, connectivity, software or service, and the team’s time reviewing alerts. Enter your own estimate or the figure from a quote you have."
      ],
      [
        "What if monitoring costs more than the downtime?",
        "The calculator tells you so: it would not pay for itself through direct savings. It may still make sense for safety, quality or spare-parts planning, but that is assessed separately and on other criteria."
      ],
      [
        "Is my data stored or sent anywhere?",
        "No. The calculation runs in your browser. Your plant figures are not sent to any server or stored; the website analytics only records that the calculator was used."
      ],
      [
        "Which equipment does it work for?",
        "Any asset or line where you can estimate downtime hours and their cost: motors, pumps, compressors, gearboxes, presses, packaging lines… The useful approach is to analyse each critical asset separately."
      ]
    ]
  }
}

export const meta = {
  "site": "https://nanoredlabs.com",
  "repo": "https://github.com/ZzJordan/nanored-predictive-maintenance-calculator",
  "urls": {
    "es": "https://nanoredlabs.com/herramientas/calculadora-mantenimiento-predictivo",
    "en": "https://nanoredlabs.com/en/tools/predictive-maintenance-calculator"
  },
  "disclaimer": {
    "es": "NanoRed Labs (también escrito «Nano Red Labs») es el negocio de Jordan Moyano en Málaga. No tiene relación con Nano RED Biotechnology ni con otras empresas de nombre parecido.",
    "en": "NanoRed Labs (also written “Nano Red Labs”) is Jordan Moyano’s business in Málaga. It is not related to Nano RED Biotechnology or to other companies with a similar name."
  }
}
