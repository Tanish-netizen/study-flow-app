import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ResponsiveContainer } from "recharts";
import styles from "./Form.module.css"

const Form = () => {

    const [input, setInput] = useState({
        subject: "",
        hours: "",
        date: "",
    });

    const [entries, setEntries] = useState(() => {
        const data = localStorage.getItem("entries");
        return data ? JSON.parse(data) : []
    });
    const [edit, setEdit] = useState()



    useEffect(() => {
        localStorage.setItem("entries", JSON.stringify(entries))
    }, [entries])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (edit === null) {
            setEntries([...entries, input]);   // ADD
        } else {
            setEntries(
                entries.map((item, index) => {
                    if (index === edit) {
                        return input;   // UPDATE (replace)
                    } else {
                        return item;    // same
                    }
                })
            );
            setEdit(null); // edit mode off
        }


    };


    const handleDelete = (i) => {
        setEntries(entries.filter((item, index) => i !== index))
    }

    const handleEdit = (i) => {
        setInput(entries[i]),
            setEdit(i)
    }

    const analysisData = {};
    {
        entries.forEach((item) => {
            if (analysisData[item.subject]) {
                analysisData[item.subject] += Number(item.hours)
            }
            else {
                analysisData[item.subject] = Number(item.hours)
            }
        })
    }

    const chartData = Object.keys(analysisData).map((key) => {
        return {
            subject: key,
            hours: analysisData[key]
        }
    })

    const today = new Date().toISOString().split("T")[0];
    console.log(today);

    const todayEntries = entries.filter((item) => {
        return item.date === today
    })

    return (
        <div>
            <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" placeholder="Enter Subject" name="subject" value={input.subject} onChange={handleChange} required />
                    <input type="number" placeholder="Enter Hours" name="hours" value={input.hours} onChange={handleChange} required />
                    <input type="date" placeholder="Enter Date" name="date" value={input.date} onChange={handleChange} required className={styles.fullWidth} />
                    <div className={`${styles.formButton} ${styles.fullWidth}`}>
                        <button type="submit">Add Study</button>
                    </div>
                </form>
                <div className={styles.formCharacter}>
                    <img src="src/assets/ChatGPT_Image_May_11__2026__03_26_32_PM-removebg-preview.png" alt="Image" />
                </div>
            </div>

            <div className={styles.outerCard}>
                {todayEntries.map((item, index) =>
                    <div key={index} className={styles.entriesCard}>
                        <h3>{item.subject}</h3>
                        <p className={styles.subjectTitle}>TRACKED SUBJECT</p>
                        <div className={styles.hoursTitle}>
                            <span>Hours</span>
                            <strong>{item.hours}h</strong>
                        </div>
                        <div className={styles.dateTitle}>
                            <span>Date</span>
                            <strong>{item.date}</strong>
                        </div>
                        <div className={styles.entriesButton}>
                            <button onClick={() => handleEdit(index)}>Edit Study</button>
                            <button onClick={() => handleDelete(index)} className={styles.deleteButton}>Delete Study</button>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.barChart}>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis
                            dataKey="subject"
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(15,15,15,0.9)",
                                border: "none",
                                borderRadius: "10px",
                                color: "#fff"
                            }}
                            cursor={{ fill: "rgba(124,58,237,0.1)" }}
                        />
                        <Bar
                            dataKey="hours"
                            fill="url(#barGradient)"
                            radius={[12, 12, 0, 0]}
                            barSize={40}
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Form;