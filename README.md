# NanoRed Predictive Maintenance Calculator

**This free calculator by NanoRed Labs (Málaga, Spain) compares what unplanned downtime on a machine or line costs you each year (downtime hours at their hourly cost, plus repairs) with what monitoring it would cost, and gives you the break-even point: how many downtime hours a year monitoring would need to avoid to pay for itself. You enter every figure; it applies no reduction percentages and promises no results. It runs in your browser: your data is never sent to a server.**

**Esta calculadora gratuita de NanoRed Labs (Málaga) compara lo que te cuestan al año las paradas no planificadas de un equipo o una línea (horas de parada por su coste por hora, más las reparaciones) con lo que costaría monitorizarlo, y te da el punto de equilibrio: cuántas horas de parada al año tendría que evitar la monitorización para pagarse. Todas las cifras las pones tú; no aplica porcentajes de reducción ni promete resultados. Funciona en tu navegador: los datos no se envían a ningún servidor.**

- **Use it online / Úsalo en la web:** https://zzjordan.github.io/nanored-predictive-maintenance-calculator/
- **On nanoredlabs.com:** [English](https://nanoredlabs.com/en/tools/predictive-maintenance-calculator) · [Español](https://nanoredlabs.com/herramientas/calculadora-mantenimiento-predictivo)
- **License / Licencia:** [MIT](LICENSE) · free, no sign-up, no analytics / gratis, sin registro, sin analítica

> NanoRed Labs (also written “Nano Red Labs”) is Jordan Moyano’s business in Málaga. It is not related to Nano RED Biotechnology or to other companies with a similar name.
>
> NanoRed Labs (también escrito «Nano Red Labs») es el negocio de Jordan Moyano en Málaga. No tiene relación con Nano RED Biotechnology ni con otras empresas de nombre parecido.

## English

### How to use

1. **Estimate the cost of one hour of downtime.** Add up the production lost (or its margin), the staff left idle and the emergency costs: overtime, express transport, penalties.
2. **Enter a year of stoppages.** Unplanned downtime hours caused by failures and how many failures they are spread over, for the machine or line you want to analyse. Take the data from work orders or your maintenance system.
3. **Add the repair.** The average cost of repairing each failure: parts, labour and external service. If it is already in the hourly cost, enter 0.
4. **Compare with monitoring.** Enter your estimate of the annual cost of monitoring that asset to see how many downtime hours, or how many failures, it would need to avoid to pay for itself.

### Features

- Annual cost of unplanned downtime and repairs
- Average cost per failure
- Break-even point in downtime hours and in failures
- No reduction percentages: the user enters every figure
- Runs in the browser, no data sent

### Privacy

The figures you type never leave your browser. No server, no analytics.

### Good to know

- The result depends on your estimates, especially the cost per hour of downtime: if in doubt, try a cautious figure and a high one.
- It is a break-even calculation, not a savings forecast or a promise to reduce downtime.
- It does not account for indirect benefits (safety, quality, spare-parts planning) or implementation costs beyond those you include in the annual cost.
- Monitoring does not prevent failures on its own: the signals must anticipate that failure mode and the team must be able to act in time.

### FAQ

**How do I calculate the cost of one hour of downtime?**
Add the production lost in that hour (units not made times their margin, or their price if you cannot make them up), the cost of idle staff and the emergency costs the stoppage causes: overtime to catch up, express transport or penalties. A reasonable estimate is enough to start.

**What is the monitoring break-even point?**
It is the number of downtime hours per year that monitoring would need to avoid to cover its cost: annual monitoring cost divided by the cost of one hour of downtime. If it is a small fraction of your current downtime, it is worth studying whether the data supports it.

**How much does predictive maintenance reduce downtime?**
We do not give a percentage because it depends on the asset, its failure modes, the signals available and the ability to act. That is why the calculator does not apply one: it tells you how much it would need to avoid to pay for itself, which can then be compared with what a bounded trial shows.

**What should I include in the cost of monitoring?**
Sensors and installation spread over the years you expect to use them, connectivity, software or service, and the team’s time reviewing alerts. Enter your own estimate or the figure from a quote you have.

**What if monitoring costs more than the downtime?**
The calculator tells you so: it would not pay for itself through direct savings. It may still make sense for safety, quality or spare-parts planning, but that is assessed separately and on other criteria.

**Is my data stored or sent anywhere?**
No. The calculation runs in your browser. Your plant figures are not sent to any server or stored; the website analytics only records that the calculator was used.

**Which equipment does it work for?**
Any asset or line where you can estimate downtime hours and their cost: motors, pumps, compressors, gearboxes, presses, packaging lines… The useful approach is to analyse each critical asset separately.

## Español

### Cómo se usa

1. **Estima el coste de una hora de parada.** Suma la producción que se deja de hacer (o su margen), el personal que queda parado y los costes de urgencia: horas extra, transporte urgente, penalizaciones.
2. **Pon las paradas de un año.** Horas de parada no planificada por averías y en cuántas averías se reparten, del equipo o la línea que quieres analizar. Saca los datos de los partes o del sistema de mantenimiento.
3. **Añade la reparación.** El coste medio de reparar cada avería: piezas, mano de obra y servicio externo. Si ya lo has metido en el coste por hora, pon 0.
4. **Compara con monitorizar.** Escribe tu estimación del coste anual de monitorizar ese activo y verás cuántas horas de parada, o cuántas averías, tendría que evitar para pagarse.

### Qué incluye

- Coste anual de paradas no planificadas y reparaciones
- Coste medio por avería
- Punto de equilibrio en horas de parada y en averías
- Sin porcentajes de reducción: todas las cifras las pone el usuario
- Funciona en el navegador, sin enviar datos

### Privacidad

Las cifras que escribes no salen de tu navegador. No hay servidor ni analítica.

### Lo que conviene saber

- El resultado depende de tus estimaciones, sobre todo del coste por hora de parada: si dudas, prueba con una cifra prudente y otra alta.
- Es una cuenta de equilibrio, no una previsión de ahorro ni una promesa de reducción de paradas.
- No tiene en cuenta beneficios indirectos (seguridad, calidad, planificación de repuestos) ni costes de implantación aparte de los que incluyas en el coste anual.
- Monitorizar no evita averías por sí solo: hace falta que las señales anticipen ese modo de fallo y que el equipo pueda actuar a tiempo.

### Preguntas frecuentes

**¿Cómo calculo el coste de una hora de parada?**
Suma la producción perdida en esa hora (unidades que no se fabrican por su margen, o su precio si no puedes recuperarlas), el coste del personal que queda parado y los costes de urgencia que provoca la parada: horas extra para recuperar, transporte urgente o penalizaciones. Una estimación razonable basta para empezar.

**¿Qué es el punto de equilibrio de la monitorización?**
Son las horas de parada al año que la monitorización tendría que evitar para que su coste quede cubierto: coste anual de monitorizar dividido entre el coste de una hora de parada. Si es una fracción pequeña de lo que paras hoy, merece la pena estudiar si los datos lo permiten.

**¿Cuánto reduce las paradas el mantenimiento predictivo?**
No damos un porcentaje porque depende del activo, de sus modos de fallo, de las señales disponibles y de la capacidad de actuar. Por eso la calculadora no lo aplica: te dice cuánto tendría que evitar para pagarse, y eso se compara con lo que se pueda comprobar en una prueba acotada.

**¿Qué debo incluir en el coste de monitorizar?**
Sensores e instalación repartidos por los años que esperas usarlos, conectividad, software o servicio, y el tiempo del equipo para revisar los avisos. Pon tu propia estimación o la de un presupuesto que tengas.

**¿Y si la monitorización cuesta más que las paradas?**
La calculadora te lo dice: por ahorro directo no se pagaría. Puede seguir teniendo sentido por seguridad, calidad o para planificar repuestos, pero eso se valora aparte y con otros criterios.

**¿Se guardan o se envían mis datos?**
No. El cálculo se hace en tu navegador. Las cifras de tu planta no se envían a ningún servidor ni se guardan; la analítica de la web solo registra que se ha usado la calculadora.

**¿Para qué equipos sirve?**
Para cualquier activo o línea en el que puedas estimar horas de parada y su coste: motores, bombas, compresores, reductoras, prensas, líneas de envasado… Lo útil es analizar cada activo crítico por separado.

## Development / Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm test     # Vitest
pnpm lint     # tsc --noEmit
pnpm build    # dist/ (relative paths, works under any prefix)
```

React 19 + TypeScript + Vite + Tailwind CSS 4. The tool runs entirely in the browser: there is no backend, no analytics and no external request. It is the same code that runs on nanoredlabs.com, with the site-specific parts (router, analytics) replaced by small shims in `src/shims/` and `src/lib/analytics.ts`.

## License / Licencia

[MIT](LICENSE) © NanoRed Labs.

Hecho por / Made by [NanoRed Labs](https://nanoredlabs.com) (Málaga).
