"use client";

import { useMemo, useState } from "react";
import {
  Activity, Bell, CalendarCheck, CarFront, ChartNoAxesCombined, Check,
  ChevronDown, CircleHelp, ClipboardList, FileText, Handshake, LayoutDashboard,
  LogOut, Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, SlidersHorizontal,
  TrendingUp, Users, UsersRound, Wallet, X
} from "lucide-react";

type Role = "manager" | "director";
type Section = "Главная" | "Клиенты" | "Автомобили" | "Сделки" | "Задачи" | "Сотрудники" | "Финансы" | "Документы" | "Аналитика" | "Настройки";

const clients = [
  { name: "Александр Иванов", phone: "+46 70 123 45 67", interest: "Volvo XC60", manager: "Анна Смирнова", status: "Переговоры", color: "blue" },
  { name: "Мария Петрова", phone: "+46 70 234 56 78", interest: "BMW 320i", manager: "Максим Орлов", status: "Новая заявка", color: "purple" },
  { name: "Дмитрий Соколов", phone: "+46 70 345 67 89", interest: "Audi Q5", manager: "Анна Смирнова", status: "Тест-драйв", color: "green" },
  { name: "Елена Волкова", phone: "+46 70 456 78 90", interest: "Kia Sportage", manager: "Игорь Ким", status: "Подбор авто", color: "orange" },
];

const cars = [
  { model: "Volvo XC60 B5 AWD", year: "2023", mileage: "18 400 км", type: "С пробегом", price: "489 000", state: "В наличии" },
  { model: "BMW  i4 eDrive40", year: "2025", mileage: "Новый", type: "Новый", price: "679 000", state: "В наличии" },
  { model: "Audi Q5 2.0 TDI", year: "2022", mileage: "42 100 км", type: "С пробегом", price: "419 000", state: "Резерв" },
];

const tasks = [
  { time: "09:30", title: "Позвонить Александру Иванову", detail: "Обсудить условия по Volvo XC60", tag: "Звонок" },
  { time: "11:00", title: "Тест-драйв BMW 320i", detail: "Клиент: Мария Петрова", tag: "Встреча" },
  { time: "14:30", title: "Подготовить предложение", detail: "Клиент: Дмитрий Соколов", tag: "Документы" },
];

const nav: { label: Section; icon: any; group?: string }[] = [
  { label: "Главная", icon: LayoutDashboard, group: "РАБОЧЕЕ ПРОСТРАНСТВО" },
  { label: "Клиенты", icon: Users },
  { label: "Автомобили", icon: CarFront },
  { label: "Сделки", icon: Handshake },
  { label: "Задачи", icon: CalendarCheck },
  { label: "Сотрудники", icon: UsersRound, group: "УПРАВЛЕНИЕ" },
  { label: "Финансы", icon: Wallet },
  { label: "Документы", icon: FileText },
  { label: "Аналитика", icon: ChartNoAxesCombined },
  { label: "Настройки", icon: Settings },
];

function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export default function CrmShell() {
  const [role, setRole] = useState<Role>("director");
  const [section, setSection] = useState<Section>("Главная");
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const roleName = role === "director" ? "Руководитель" : "Менеджер";
  const filteredClients = useMemo(() => clients.filter(c => `${c.name} ${c.phone} ${c.interest}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function changeSection(s: Section) { setSection(s); setMobileNav(false); }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon"><CarFront size={22}/></div>
          <div><strong>AutoCRM</strong><small>DEALERSHIP SYSTEM</small></div>
          <button className="mobile-close" onClick={() => setMobileNav(false)}><X size={18}/></button>
        </div>
        <div className="workspace-switch"><div className="workspace-avatar">A</div><div><b>Auto Center</b><small>Основной автосалон</small></div><ChevronDown size={15}/></div>
        <div className="nav-list">
          {nav.map((item, index) => {
            const Icon = item.icon;
            return <div key={item.label}>
              {item.group && <div className="nav-caption">{item.group}</div>}
              <button onClick={() => changeSection(item.label)} className={`nav-item ${section === item.label ? "active" : ""}`}>
                <Icon size={18}/><span>{item.label}</span>
                {item.label === "Задачи" && <i className="nav-count">3</i>}
              </button>
            </div>;
          })}
        </div>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Нужна помощь?</b><p>Посмотрите руководство по работе с AutoCRM.</p><a href="#">Открыть справку →</a></div>
          <div className="profile-mini"><div className="avatar">АС</div><div className="profile-copy"><b>Алексей Смирнов</b><small>{roleName}</small></div><MoreHorizontal size={19}/></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
          <div className="breadcrumbs">Auto Center <span>/</span> <b>{section}</b></div>
          <div className="top-actions">
            <label className="global-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Поиск клиентов, авто..." /><kbd>⌘ K</kbd></label>
            <button className="top-icon"><Bell size={19}/><i/></button>
            <div className="top-divider"/>
            <div className="top-user"><div className="avatar">АС</div><div><b>Алексей Смирнов</b><small>{roleName}</small></div><ChevronDown size={15}/></div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div><div className="eyebrow">{role === "director" ? "ОБЗОР АВТОСАЛОНА" : "МОЁ РАБОЧЕЕ ПРОСТРАНСТВО"}</div><h1>{section === "Главная" ? (role === "director" ? "Доброе утро, Алексей" : "Доброе утро, Алексей") : section}</h1><p>{section === "Главная" ? "Вот что происходит в вашем автосалоне сегодня." : `Рабочий раздел AutoCRM — ${section.toLowerCase()}.`}</p></div>
            <div className="heading-actions">
              <div className="role-switch"><ShieldCheck size={15}/><select value={role} onChange={e => setRole(e.target.value as Role)} aria-label="Демонстрация роли"><option value="director">Руководитель</option><option value="manager">Менеджер</option></select><ChevronDown size={13}/></div>
              <button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17}/> Добавить клиента</button>
            </div>
          </div>

          {section === "Главная" && <>
            <div className="stats-grid">
              {(role === "director" ? [
                { label: "Клиенты в базе", value: "1 284", change: "+12,8%", icon: Users, tone: "blue", foot: "к прошлому месяцу" },
                { label: "Активные сделки", value: "86", change: "+8,2%", icon: Handshake, tone: "violet", foot: "к прошлому месяцу" },
                { label: "Автомобили в наличии", value: "42", change: "6 новых", icon: CarFront, tone: "green", foot: "36 с пробегом" },
                { label: "Продажи за месяц", value: "28", change: "+4", icon: TrendingUp, tone: "orange", foot: "к предыдущему месяцу" },
              ] : [
                { label: "Мои клиенты", value: "48", change: "+6", icon: Users, tone: "blue", foot: "за текущий месяц" },
                { label: "Мои сделки", value: "12", change: "8 активных", icon: Handshake, tone: "violet", foot: "в работе" },
                { label: "Мои задачи", value: "7", change: "3 срочные", icon: CalendarCheck, tone: "green", foot: "на сегодня" },
                { label: "Мои продажи", value: "5", change: "+2", icon: TrendingUp, tone: "orange", foot: "за текущий месяц" },
              ]).map((s) => { const Icon = s.icon; return <div className="stat-card" key={s.label}><div className="stat-top"><span>{s.label}</span><div className={`stat-icon ${s.tone}`}><Icon size={18}/></div></div><div className="stat-value">{s.value}</div><div className="stat-foot"><b>{s.change}</b><span>{s.foot}</span></div></div>; })}
            </div>

            <div className="dashboard-grid">
              <section className="panel sales-panel">
                <div className="panel-heading"><div><h2>Динамика продаж</h2><p>Количество закрытых сделок</p></div><select className="select-small"><option>Последние 6 месяцев</option><option>Этот год</option></select></div>
                <div className="chart-area"><div className="chart-y"><span>30</span><span>20</span><span>10</span><span>0</span></div><div className="chart-main"><div className="chart-grid"><i/><i/><i/><i/></div><div className="bars">{[38,54,46,70,61,88].map((h,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${h}%`}}/><small>{["Июн","Июл","Авг","Сен","Окт","Ноя"][i]}</small></div>)}</div></div></div>
                <div className="chart-legend"><span><i/> Продажи</span><small>Демонстрационные данные</small></div>
              </section>
              <section className="panel tasks-panel">
                <div className="panel-heading"><div><h2>Задачи на сегодня</h2><p>Ваш план на 6 ноября</p></div><button className="text-button" onClick={() => changeSection("Задачи")}>Все задачи →</button></div>
                <div className="task-list">{tasks.map((t,i)=><div className="task-row" key={t.title}><div className="task-time">{t.time}</div><div className="task-dot"/><div className="task-info"><b>{t.title}</b><small>{t.detail}</small></div><Badge tone={i===0?"blue":i===1?"purple":"gray"}>{t.tag}</Badge></div>)}</div>
                <button className="add-task" onClick={() => changeSection("Задачи")}><Plus size={16}/> Добавить задачу</button>
              </section>
            </div>

            {role === "director" && <section className="panel team-panel">
              <div className="panel-heading"><div><h2>Эффективность команды</h2><p>Результаты менеджеров за текущий месяц</p></div><button className="text-button" onClick={() => changeSection("Сотрудники")}>Все сотрудники →</button></div>
              <div className="table-wrap"><table><thead><tr><th>МЕНЕДЖЕР</th><th>СДЕЛКИ</th><th>ПРОДАЖИ</th><th>КОНВЕРСИЯ</th><th>ПЛАН</th></tr></thead><tbody><tr><td><div className="person-cell"><div className="avatar blue-avatar">АС</div><b>Анна Смирнова</b></div></td><td>18</td><td>8</td><td>44,4%</td><td><div className="progress-cell"><div className="progress"><i style={{width:"80%"}}/></div><b>80%</b></div></td></tr><tr><td><div className="person-cell"><div className="avatar violet-avatar">МО</div><b>Максим Орлов</b></div></td><td>15</td><td>7</td><td>46,7%</td><td><div className="progress-cell"><div className="progress"><i style={{width:"70%"}}/></div><b>70%</b></div></td></tr><tr><td><div className="person-cell"><div className="avatar orange-avatar">ИК</div><b>Игорь Ким</b></div></td><td>12</td><td>5</td><td>41,7%</td><td><div className="progress-cell"><i className="progress"><i style={{width:"55%"}}/></i><b>55%</b></div></td></tr></tbody></table></div>
            </section>}
          </>}

          {section === "Клиенты" && <section className="panel list-panel"><div className="panel-heading"><div><h2>Клиентская база</h2><p>Единая база клиентов автосалона</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17}/> Добавить клиента</button></div><div className="filter-row"><div className="inline-search"><Search size={16}/><input placeholder="Найти клиента..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="secondary-button"><SlidersHorizontal size={16}/> Фильтры</button></div><div className="table-wrap"><table><thead><tr><th>КЛИЕНТ</th><th>ТЕЛЕФОН</th><th>ИНТЕРЕС</th><th>ОТВЕТСТВЕННЫЙ</th><th>СТАТУС</th></tr></thead><tbody>{filteredClients.map(c=><tr key={c.name}><td><b>{c.name}</b></td><td>{c.phone}</td><td>{c.interest}</td><td>{c.manager}</td><td><Badge tone={c.color}>{c.status}</Badge></td></tr>)}</tbody></table></div></section>}

          {section === "Автомобили" && <section className="panel list-panel"><div className="panel-heading"><div><h2>Автомобили</h2><p>Новые автомобили и автомобили с пробегом</p></div><button className="primary-button"><Plus size={17}/> Добавить автомобиль</button></div><div className="filter-row"><div className="inline-search"><Search size={16}/><input placeholder="Марка, модель или VIN..."/></div><button className="secondary-button"><SlidersHorizontal size={16}/> Фильтры</button></div><div className="table-wrap"><table><thead><tr><th>АВТОМОБИЛЬ</th><th>ГОД</th><th>ПРОБЕГ</th><th>ТИП</th><th>ЦЕНА</th><th>СТАТУС</th></tr></thead><tbody>{cars.map(c=><tr key={c.model}><td><b>{c.model}</b></td><td>{c.year}</td><td>{c.mileage}</td><td>{c.type}</td><td><b>{c.price}</b></td><td><Badge tone={c.state==="Резерв"?"orange":"green"}>{c.state}</Badge></td></tr>)}</tbody></table></div></section>}

          {section === "Сделки" && <section className="panel list-panel"><div className="panel-heading"><div><h2>Воронка продаж</h2><p>Управление сделками на всех этапах</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17}/> Новая сделка</button></div><div className="kanban">{[{name:"Новая заявка",n:12,items:["Мария Петрова · BMW 320i","Павел Никитин · Volvo V60"]},{name:"Контакт",n:18,items:["Олег Морозов · Audi A4","Ирина Белова · Kia Sportage"]},{name:"Тест-драйв",n:9,items:["Дмитрий Соколов · Audi Q5"]},{name:"Переговоры",n:7,items:["Александр Иванов · Volvo XC60"]}].map(col=><div className="kanban-col" key={col.name}><div className="kanban-title"><b>{col.name}</b><span>{col.n}</span></div>{col.items.map(item=><div className="deal-card" key={item}><b>{item.split(" · ")[0]}</b><small>{item.split(" · ")[1]}</small><div className="deal-meta"><span>Сегодня</span><MoreHorizontal size={16}/></div></div>)}</div>)}</div></section>}

          {section === "Задачи" && <section className="panel list-panel"><div className="panel-heading"><div><h2>Мои задачи</h2><p>Запланированные действия и напоминания</p></div><button className="primary-button"><Plus size={17}/> Создать задачу</button></div>{tasks.map(t=><div className="simple-task" key={t.title}><div className="task-check"><Check size={15}/></div><div><b>{t.title}</b><p>{t.detail}</p></div><span>{t.time}</span></div>)}</section>}

          {!["Главная","Клиенты","Автомобили","Сделки","Задачи"].includes(section) && <section className="panel placeholder-panel"><div className="placeholder-icon"><Activity size={28}/></div><h2>{section}</h2><p>Этот модуль предусмотрен архитектурой AutoCRM и будет реализован следующим этапом.</p><Badge tone="blue">В плане разработки</Badge></section>}
        </div>
      </main>

      {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-heading"><div><h2>Новый клиент</h2><p>Добавление клиента в общую базу</p></div><button className="icon-button" onClick={() => setShowAdd(false)}><X size={19}/></button></div><form onSubmit={e=>{e.preventDefault();setShowAdd(false);}}><label>Имя клиента</label><input className="field" placeholder="Например, Иван Иванов" required/><label>Телефон</label><input className="field" placeholder="+46 ..." required/><label>Email</label><input className="field" type="email" placeholder="client@email.com"/><label>Интересующий автомобиль</label><input className="field" placeholder="Марка и модель"/><label>Ответственный менеджер</label><select className="field"><option>Анна Смирнова</option><option>Максим Орлов</option><option>Игорь Ким</option></select><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAdd(false)}>Отмена</button><button className="primary-button" type="submit">Сохранить клиента</button></div><p className="form-note">Демонстрационная форма: данные пока не сохраняются в базе.</p></form></div></div>}
    </div>
  );
}
