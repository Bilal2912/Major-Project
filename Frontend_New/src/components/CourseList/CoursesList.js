import CourseCard from './CourseCard';
import {
  AbsoluteCenter,
  SimpleGrid,
  Input,
  Box,
  Grid,
  GridItem,
  Button,
  Circle,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Text,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link  , useLocation} from 'react-router-dom';
import { PlayerSkipBack, PlayerSkipForward } from 'tabler-icons-react';
import {
  getAllCourse,
  getCourse,
  clearErrors,
} from '../../actions/courseAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import IconBox from './IconBox';
import SidebarWithHeader from '../../components/SideBar.jsx';
import {getUserCreatedCourses} from '../../actions/userAction';
const CoursesList = (props) => {
  const {enrolledonly , create} = props ;
  const [course, setCourse] = useState([]);
  const { allCourses } = useSelector(state => state.allCourses);
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    loading,
    error,
    courses,
    courseCount,
    resultPerPage,
    filteredCoursesCount,
  } = useSelector(state => state.courses);
  const options = ['ETRX', 'EXTC', 'IT', 'COMPS', 'MCA'];
  const location = useLocation();

  const { user } = useSelector(state => state.user);
  const {  loading : loader,
    error : errorer,
    createdCourses , filteredCoursesCount : max_page } = useSelector(state => state.userCreatedCourses)
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(
    filteredCoursesCount !== undefined
      ? Math.floor(filteredCoursesCount / 8)
      : 1
  );
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState('ETRX');
  const [keyword, setKeyword] = useState('');
  const [ratings, setRatings] = useState(0);
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    console.log(courses)
    setTotalPage(Math.ceil(filteredCoursesCount / 8));
  }, [filteredCoursesCount]);
  const arr = new Array(totalPages <= 5 ? totalPages : 5);
  arr.fill(0);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCourse(keyword, page, price, category, ratings));
  }, [dispatch, error, alert, keyword, page, price, category, ratings]);
  const handleChangePage = val => {
    setPage(val);
  };
  useEffect(() => {
    dispatch(getUserCreatedCourses(keyword, page ,category, ratings))
  } , [dispatch, keyword, page, category, ratings])


  useEffect(() => {
    setPage(1)
  } , [keyword , ratings ,category])
  return (
    <>
      {/* <Navbar /> */}
      <SidebarWithHeader>
        <Box padding={'5px'}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem>
              <Box w={'95%'}>
                <Input
                  placeholder="Search"
                  value={keyword}
                  onChange={e => {
                    setKeyword(e.target.value);
                  }}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={1} w={'90%'}>
              <VStack>
                <Select
                  placeholder="Select option"
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                >
                  {options.map(ele => (
                    <option value={ele}>{ele}</option>
                  ))}
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1}>
              {' '}
              <Box w={'80%'}>
                <Text>Ratings Range</Text>
                <Slider
                  defaultValue={0}
                  min={0}
                  max={5}
                  step={0.5}
                  value={ratings}
                  onChange={v => setRatings(v)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderTrack bg="red.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${ratings} stars`}
                  >
                    <SliderThumb boxSize={6} />
                  </Tooltip>
                </Slider>
              </Box>
            </GridItem>
            {create ? <GridItem>
              <Link to="/addcourse">
                <Button colorScheme={'blue'}>Create New Course</Button>
              </Link>
            </GridItem> : <GridItem></GridItem> }
            
            <GridItem>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <Text>
                  Page {page} {''}
                  of {totalPages}
                </Text>
                <IconBox
                  name={''}
                  icon={<ArrowBackIcon />}
                  onClick={() => {
                    if (page !== 1) {
                      handleChangePage(page - 1);
                    }
                  }}
                  color={'black'}
                  cursor={page === 1 ? 'not-allowed' : 'pointer'}
                />
                <IconBox
                  name={''}
                  icon={<ArrowForwardIcon />}
                  onClick={() => {
                    if (page !== totalPages) {
                      handleChangePage(page + 1);
                    }
                  }}
                  cursor={page === totalPages ? 'not-allowed' : 'pointer'}
                />
              </Stack>
            </GridItem>
          </Grid>
        </Box>
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={5}>
            {(!enrolledonly && !create) &&  <SimpleGrid columns={4} spacing={2} className="">
              {courses !== undefined > 0 &&
                courses.map(ele => <CourseCard coursedata={ele} />)}

              {/* <><Text>No Data Available</Text></> */}
            </SimpleGrid> }
           {( enrolledonly && !create && <SimpleGrid columns={4} spacing={2} className="">
              {user !== undefined &&
                user.enrolledIn.map(ele => <CourseCard coursedata={ele.course} />)}

              {/* <><Text>No Data Available</Text></> */}
            </SimpleGrid>)
            }
             {
              create &&  (
              <><SimpleGrid columns={4} spacing={2} className="">
              {user.courses !== undefined > 0 &&
                user.courses.map(ele => <CourseCard coursedata={ele.course} />)}

              {/* <><Text>No Data Available</Text></> */}
            </SimpleGrid>
            {
              user.courses.length === 0 && (
                <Text>No data Availabe</Text>
              )
            }
            </>
            )
            }

          </GridItem>
        </Grid>

        {/* <Box position="relative">
        <Center>
          <Circle
            as="button"
            onClick={prevPage}
            _disabled={page === 1}
            size={30}
            bg={'grey'}
            color={'black'}
          >
            <PlayerSkipBack size={20} strokeWidth={2} color={'black'} />
          </Circle>
          {arr.map((ele, index) => (
            <Circle
              as="button"
              onClick={() => {
                setPage(index + 1);
              }}
              _hover={{ bg: 'grey' }}
              size={30}
            >
              {index + 1}
            </Circle>
          ))}
          <Circle
            as="button"
            onClick={nextPage}
            _disabled={page === totalPages}
            size={30}
            bg={'grey'}
            color={'black'}
          >
            <PlayerSkipForward size={20} strokeWidth={2} color={'black'} />
          </Circle>
        </Center>
      </Box> */}
      </SidebarWithHeader>
    </>
  );
};

export default CoursesList;
