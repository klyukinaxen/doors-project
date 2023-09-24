const translates = {
    door_lock: 'Замки',
    door_still_cover: 'Накладки',
    door_type: 'Тип двери',
    film_type: 'Тип пленки',

    inner_panel: 'Внутренняя панель',
    price_default: 'Цены',
    properties: 'Параметры',
    outside_panel: 'Внешняя панель',
    outside_panel_10: 'Панель снаружи 10мм мдф',
    outside_panel_9_5: 'Панель снаружи 9.5мм корабельная фанера'
}

export const t = (key) => translates[key] || key
