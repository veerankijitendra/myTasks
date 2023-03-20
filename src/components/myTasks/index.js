import {useState} from 'react'

import {v4 as uuidv4} from 'uuid'

import {Button, List} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const MyTasks = () => {
  const [inputValue, setInputValue] = useState('')
  const [tagValue, setTagValue] = useState(tagsList[0].optionId)
  const [activeButtons, setActiveButtons] = useState([])
  const [tasks, setTasks] = useState([])

  const renderButtons = () => (
    <List as="ul">
      {tagsList.map(each => {
        const isActive = activeButtons.includes(each.optionId)

        return (
          <li key={each.optionId}>
            <Button
              type="button"
              isActive={isActive.toString()}
              onClick={() => {
                const {displayText} = each
                const isThere = activeButtons.includes(displayText)
                if (isThere) {
                  const filteredList = activeButtons.filter(
                    item => item !== displayText,
                  )

                  setActiveButtons([...filteredList])
                } else {
                  setActiveButtons(previous => [...previous, each.displayText])
                }
              }}
            >
              {each.displayText}
            </Button>
          </li>
        )
      })}
    </List>
  )

  const renderTaskList = list =>
    list.map(each => (
      <List key={each.id}>
        <p>{each.taskName}</p>
        <p>{each.taskType}</p>
      </List>
    ))

  const renderTasks = () => {
    let filterList
    if (activeButtons.length !== 0) {
      filterList = tasks.filter(each => activeButtons.includes(each.taskType))
    } else {
      filterList = [...tasks]
    }

    return (
      <ul>
        {filterList.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          renderTaskList(filterList)
        )}
      </ul>
    )
  }

  return (
    <>
      <div>
        <h1>Create a task!</h1>
        <form
          onClick={e => {
            e.preventDefault()

            const taskType = tagsList.filter(each => each.optionId === tagValue)
            const object = {
              id: uuidv4(),
              taskName: inputValue,
              taskType: taskType[0].displayText,
            }
            if (inputValue !== '') {
              setTasks(previous => [...previous, object])
              setInputValue('')
              setTagValue(tagsList[0].optionId)
            }
          }}
        >
          <div>
            <label htmlFor="input">Task</label>
            <input
              placeholder="Enter the task here"
              value={inputValue}
              id="input"
              onChange={e => {
                setInputValue(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="tag">Tags</label>
            <select
              id="tag"
              value={tagValue}
              onChange={e => {
                setTagValue(e.target.value)
              }}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div>
        <h1>Tags</h1>
        {renderButtons()}
        <h1>Tasks</h1>
        {renderTasks()}
      </div>
    </>
  )
}

export default MyTasks
